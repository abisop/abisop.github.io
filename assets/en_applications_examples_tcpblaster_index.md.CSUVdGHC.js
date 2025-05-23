import{_ as t,c as n,al as o,o as s}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"tcpblaster TCP Performance Test","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/examples/tcpblaster/index.md","filePath":"en/applications/examples/tcpblaster/index.md"}'),c={name:"en/applications/examples/tcpblaster/index.md"};function r(a,e,p,d,i,l){return s(),n("div",null,e[0]||(e[0]=[o(`<h1 id="tcpblaster-tcp-performance-test" tabindex="-1"><code>tcpblaster</code> TCP Performance Test <a class="header-anchor" href="#tcpblaster-tcp-performance-test" aria-label="Permalink to &quot;\`tcpblaster\` TCP Performance Test&quot;">​</a></h1><p>The <code>tcpblaster</code> example derives from the <code>nettest</code> example and basically duplicates that example when the <code>nettest</code> PERFORMANCE option is selected. <code>tcpblaster</code> has a little better reporting of performance stats, however.</p><p>To set up, do <code>make menuconfig</code> and select the Apps → Examples → tcpblaster. By default, nuttx will the be the client which sends data; and the host computer (Linux, macOS, or Windows) will be the server.</p><p>Set up networking so the nuttx computer can ping the host, and the host can ping nuttx. Now you are ready to run the test.</p><p>On host:</p><pre><code> ./tcpserver
Binding to IPv4 Address: 00000000
server: Accepting connections on port 5471
</code></pre><p>On nuttx:</p><pre><code>nsh&gt; tcpclient
Connecting to IPv4 Address: 0100000a
client: Connected
[2014-07-31 00:16:15.000] 0: Sent 200 4096-byte buffers:    800.0 KB (avg   4.0 KB) in   0.18 seconds (4444.4 KB/second)
</code></pre><p>Now on the host you should see something like:</p><pre><code> ./tcpserver
Binding to IPv4 Address: 00000000
server: Accepting connections on port 5471
server: Connection accepted -- receiving
[2020-02-22 16:17:07.000] 0: Received 200 buffers:   502.9 KB (buffer average size:   2.5 KB) in   0.12 seconds (4194.8 KB/second)
[2020-02-22 16:17:07.000] 1: Received 200 buffers:   393.1 KB (buffer average size:   2.0 KB) in   0.09 seconds (4299.4 KB/second)
</code></pre><p>This will tell you the link speed in KB/sec – kilobytes per second. If you want kilobits, multiply by <code>8</code>.</p><p>You can use the <code>make menuconfig</code> to reverse the setup, and have nuttx be the server, and the host be the client. If you do that, start the server first (nuttx), then start the client (host).</p>`,12)]))}const f=t(c,[["render",r]]);export{u as __pageData,f as default};
