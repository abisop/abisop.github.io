import{_ as t,c as s,al as i,o as r}from"./chunks/framework.NFAqBSgQ.js";const f=JSON.parse('{"title":"iperf iperf","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/netutils/iper/index.md","filePath":"en/applications/netutils/iper/index.md"}'),n={name:"en/applications/netutils/iper/index.md"};function o(a,e,p,c,u,l){return r(),s("div",null,e[0]||(e[0]=[i(`<h1 id="iperf-iperf" tabindex="-1"><code>iperf</code> iperf <a class="header-anchor" href="#iperf-iperf" aria-label="Permalink to &quot;\`iperf\` iperf&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>This is a NuttX port of the ESP-IDF iperf example. [1]</p><p>It doesn&#39;t support all features in standard iperf. It&#39;s supposed to be compatible with iperf version 2.x. [2]</p><p>[1] <a href="https://github.com/espressif/esp-idf/tree/master/examples/wifi/iperf" target="_blank" rel="noreferrer">https://github.com/espressif/esp-idf/tree/master/examples/wifi/iperf</a> [2] <a href="https://sourceforge.net/projects/iperf2/" target="_blank" rel="noreferrer">https://sourceforge.net/projects/iperf2/</a></p><h2 id="configuring-nuttx-to-use-your-wireless-router-aka-access-point" tabindex="-1">Configuring NuttX to use your Wireless Router (aka Access Point) <a class="header-anchor" href="#configuring-nuttx-to-use-your-wireless-router-aka-access-point" aria-label="Permalink to &quot;Configuring NuttX to use your Wireless Router (aka Access Point)&quot;">​</a></h2><p>Since you are already in the root of NuttX/ repository, execute make menuconfig to define your Wireless Router and your password:</p><pre><code> make menuconfig

Browser the menus this way:

Application Configuration  ---&gt;
    Network Utilities  ---&gt;
        Networking Configuration  ---&gt;
            WAPI Configuration  ---&gt;
                (myApSSID) SSID
                (mySSIDpassphrase) Passprhase
</code></pre><p>Replace the SSID from myApSSID with your wireless router name and the Passprhase with your WiFi password.</p><p>Exit and save your configuration.</p><h2 id="iperf-test-example" tabindex="-1">iperf Test Example <a class="header-anchor" href="#iperf-test-example" aria-label="Permalink to &quot;iperf Test Example&quot;">​</a></h2><p>To set up, do <code>make menuconfig</code> and select the Apps &gt; netutils &gt; iperf example. By default, NuttX will the be the client which sends data; and the host computer (Linux, macOS, or Windows) will be the server.</p><p>Set up networking so the NuttX computer can ping the host, and the host can ping NuttX. Now you are ready to run the test.</p><p>If you are using a wireless network card, you must first connect to the router:</p><p>On host:</p><pre><code> iperf -s -p 5471 -i 1 -w 416K
------------------------------------------------------------
Server listening on TCP port 5471
TCP window size:  416 KByte
------------------------------------------------------------
</code></pre><p>On NuttX:</p><pre><code>nsh&gt; iperf -c 192.168.1.181 -p 5471 -i 1 -t 10
mode=tcp-client sip=192.168.1.198:5001, dip=192.168.1.181:5471, interval=1, time=10

        Interval Bandwidth

0-   1 sec,  0.39 Mbits/sec
1-   2 sec,  0.26 Mbits/sec
2-   3 sec,  0.39 Mbits/sec
3-   4 sec,  0.26 Mbits/sec
4-   5 sec,  0.26 Mbits/sec
5-   6 sec,  0.26 Mbits/sec
6-   7 sec,  0.26 Mbits/sec
7-   8 sec,  0.26 Mbits/sec
8-   9 sec,  0.26 Mbits/sec
9-  10 sec,  0.26 Mbits/sec
0-  10 sec,  0.28 Mbits/sec
</code></pre><p>Now on the host you should see something like:</p><pre><code> iperf -s -p 5471 -i 1 -w 416K
------------------------------------------------------------
Server listening on TCP port 5471
TCP window size:  416 KByte
------------------------------------------------------------
[  5] local 192.168.1.181 port 5471 connected with 192.168.1.198 port 4210
[  5]  0.0- 1.0 sec  60.8 KBytes   498 Kbits/sec
[  5]  1.0- 2.0 sec  34.9 KBytes   286 Kbits/sec
[  5]  2.0- 3.0 sec  33.7 KBytes   276 Kbits/sec
[  5]  3.0- 4.0 sec  33.4 KBytes   274 Kbits/sec
[  5]  4.0- 5.0 sec  32.0 KBytes   262 Kbits/sec
[  5]  5.0- 6.0 sec  32.0 KBytes   262 Kbits/sec
[  5]  6.0- 7.0 sec  33.4 KBytes   274 Kbits/sec
[  5]  7.0- 8.0 sec  32.0 KBytes   262 Kbits/sec
[  5]  8.0- 9.0 sec  32.0 KBytes   262 Kbits/sec
[  5]  9.0-10.0 sec  33.4 KBytes   274 Kbits/sec
[  5]  0.0-10.3 sec   368 KBytes   292 Kbits/sec
</code></pre><p>This will tell you the link speed in Kbits/sec – kilobits per second. If you want kilobytes, divide by 8.</p>`,21)]))}const h=t(n,[["render",o]]);export{f as __pageData,h as default};
