<?php
/**
 * 
 * 主逻辑
 * 主要是处理 onConnect onMessage onClose 三个方法
 * @author walkor <worker-man@qq.com>
 * 
 */
use \Lib\Context;
use \Lib\Gateway;
use \Lib\StatisticClient;
use \Lib\Store;
use \Protocols\GatewayProtocol;
use \Protocols\WebSocket;

class Event
{
    /**
     * 当网关有客户端链接上来时触发，一般这里留空
     */
    public static function onGatewayConnect()
    {
    }
    
    /**
     * 网关有消息时，判断消息是否完整
     */
    public static function onGatewayMessage($buffer)
    {
        return WebSocket::check($buffer);
    }
    
   /**
    * 当有用户连接时，会触发该方法
    */
   public static function onConnect($message)
   {
       // WebSocket 握手阶段
       if(0 === strpos($message, 'GET'))
       {
           // 解析Sec-WebSocket-Key
           $Sec_WebSocket_Key = '';
           if(preg_match("/Sec-WebSocket-Key: *(.*?)\r\n/", $message, $match))
           {
               $Sec_WebSocket_Key = $match[1];
           }
           $new_key = base64_encode(sha1($Sec_WebSocket_Key."258EAFA5-E914-47DA-95CA-C5AB0DC85B11",true));
           
           $origin_host = 'workerman.net';
           if(preg_match("/Origin: *(.*?)\r\n/", $message, $match))
           {
               $origin_url = $match[1];
               $url_info = parse_url($origin_url);
               if(isset($url_info['host']))
               {
                   $origin_host = $url_info['host'];
               }
           }
           
           // 握手返回的数据
           $new_message = "HTTP/1.1 101 Switching Protocols\r\n";
           $new_message .= "Upgrade: websocket\r\n";
           $new_message .= "Sec-WebSocket-Version: 13\r\n";
           $new_message .= "Connection: Upgrade\r\n";
           $new_message .= "Sec-WebSocket-Protocol: $origin_host\r\n";
           $new_message .= "Sec-WebSocket-Accept: $new_key\r\n\r\n";
           
           // 把时间戳当成uid，uid固定为10位数字
           $uid = (substr(strval(microtime(true)), 2, 7)*100)%10000000000;
           if($uid<1000000000)
           {
               $uid += 1000000000; 
           }
          
           // 记录uid到gateway通信地址的映射
           GateWay::storeUid($uid);
           
           // 发送数据包到address对应的gateway，确认connection成功
           GateWay::notifyConnectionSuccess($uid);
           
           // 发送数据包到客户端 完成握手
           $new_message .= WebSocket::encode(pack("CI", 0, $uid));
           $new_message .= WebSocket::encode(pack("CII", 6, 2007987396, 11350));
           GateWay::sendToCurrentUid($new_message);
           
           // 地图
           Gateway::sendToCurrentUid(pack("H*", '827e04b50396000000f30100005e0000001e030000c7000000480400009c000000710500002f0000009a06000042000000c1070000c3000000e8080000c00000000f0a00004a000000340b0000b9000000590c0000850000007d0d0000df000000a00e00008e000000c30f000093000000e5100000d1000000061200005e000000271300002800000046140000aa000000651500007900000084160000d3000000a11700002b000000be1800006a000000da1900004e000000f61a0000bd000000111c0000d00000002b1d0000cc000000441e0000ad0000005d1f0000c500000075200000da0000008c2100008a000000a2220000b9000000b8230000cf000000cd24000083000000e225000059000000f52600002700000009280000430000001b290000510000002d2a00009c0000003e2b00006e0000004e2c0000c10000005e2d0000c20000006d2e0000440000007b2f00005700000088300000d70000009531000022000000a23200009a000000ad3300008d000000b8340000c9000000c23500009e000000cc36000040000000d537000054000000dd380000d8000000e539000048000000ec3a000075000000f23b00005d000000f83c000029000000fd3d0000a2000000013f00009200000005400000df00000008410000270000000a4200003f0000000c4300009b0000000d440000230000000d450000cf0000000d460000c40000000c470000cf0000000b4800006b00000009490000a9000000064a0000b5000000034b0000af000000ff4b0000bd000000fa4c00006b000000f54d0000be000000ef4e00002c000000e84f000075000000e1500000b4000000d951000027000000d1520000df000000c85300006b000000be54000051000000b455000070000000a9560000980000009e5700004b000000925800006a000000855900009f000000785a0000750000006a5b0000d50000005b5c0000630000004c5d0000420000003d5e0000910000002c5f0000310000001b600000b20000000a61000056000000f861000069000000e562000061000000d2630000cc000000be640000e1000000a9650000b600000094660000a30000007f670000730000006868000097000000526900006d0000003a6a0000ca000000226b0000730000000a6c000097000000f06c00007a000000d76d000049000000bc6e000052000000a26f0000a600000086700000980000006a7100005e0000004e720000a200000030730000d90000001374000047000000f47400003a000000d575000039000000b67600007400000096770000260000007678000052000000547900007e000000337a0000c2000000117b0000e3000000ee7b000028000000cb7c0000c7000000a77d0000e5000000827e00008f0000005d7f00006200000038800000920000001281000062000000eb810000c6000000c4820000450000009c8300007b000000748400005f0000004b850000720000002286000094000000f8860000e1000000ce87000051000000a38800008c00000077890000ad0000004b8a0000330000001f8b000070000000f28b000083000000c48c000084000000968d0000b1000000688e0000c7000000388f0000c9000000099000003a000000d990000099000000a89100002f000000779200002f0000004593000026000000'));
           
           return ;
       }
       // 如果是flash发来的policy请求
       elseif(trim($message) === '<policy-file-request/>')
       {
           $policy_xml = '<?xml version="1.0"?><cross-domain-policy><site-control permitted-cross-domain-policies="all"/><allow-access-from domain="*" to-ports="*"/></cross-domain-policy>'."\0";
           return GateWay::sendToCurrentUid($policy_xml);
       }
       
       return null;
   }
   
   /**
    * 当用户断开连接时
    * @param integer $uid 用户id 
    */
   public static function onClose($uid)
   {
       // 广播 xxx 退出了
       //GateWay::sendToAll();
   }
   
   /**
    * 有消息时
    * @param int $uid
    * @param string $message
    */
   public static function onMessage($uid, $message)
   {
        // $message len < 7 可能是ping包，断开连接的包等暂时忽略
        if(strlen($message) < 7)
        {
            return ;
        }
        $message = WebSocket::decode($message);
        // 广播路线
        Gateway::sendToAll(WebSocket::encode(pack('CVVVC', 2, 1, 1, $uid, 0).substr($message, 1)));
   }
}
