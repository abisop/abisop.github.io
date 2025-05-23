import{_ as n,c as t,al as s,o as a}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"Congestion Control NewReno","description":"","frontmatter":{},"headers":[],"relativePath":"en/reference/os/newreno.md","filePath":"en/reference/os/newreno.md"}'),o={name:"en/reference/os/newreno.md"};function i(l,e,r,p,c,d){return a(),t("div",null,e[0]||(e[0]=[s(`<h1 id="congestion-control-newreno" tabindex="-1">Congestion Control NewReno <a class="header-anchor" href="#congestion-control-newreno" aria-label="Permalink to &quot;Congestion Control NewReno&quot;">​</a></h1><p>NewReno congestion control algorithm is used to solve the problem of network congestion breakdown, which includes:</p><p>: - Slow Start - Congestion Avoidance - Fast Retransmission - Fast Recovery.</p><pre><code>The implementation refers to RFC6582 and RFC5681. In addition, we
optimize the congestion algorithm. In the congestion avoidance
state, the maximum congestion window (max\\_cwnd) is used to limit
the excessive growth of cwnd and prevent network jitter caused by
congestion. Maximum congestion window (max\\_cwnd) is updated with
the current congestion window (cwnd) and the update weight is 0.875
when an RTO timeout occurs.
</code></pre><h2 id="workflow" tabindex="-1">Workflow <a class="header-anchor" href="#workflow" aria-label="Permalink to &quot;Workflow&quot;">​</a></h2><p>The NewReno on the tcp sender adjusts the cwnd and ssthresh based on received ack and Retransmitted Timeout (RTO) events.</p><p>Using the cwnd, together with snd_wnd, controls the number of bytes sent to the network. Here&#39;s how newreno works, as following:</p><ul><li>Initialize the ssthresh and cwnd, on establishing the tcp connection.</li><li>When the ack is received, check whether the ack is repeated.</li></ul><blockquote><ul><li>If yes, increase the dupack counts. If the dupack exceeds the Fast Retransmission Threshold 3, after retransmitting the lost segments (Fast Retransmission), enter to the Fast Recovery state.</li><li>If no, receive the new ack. <ul><li>If the current ackno is bigger than fr_ack which is the snd_seq when Fast Retransmission occurs, exit the Fast Recovery state and enter to congestion avoidance.</li><li>If the cwnd is less than ssthresh, increase the cwnd on slow start state.</li><li>If the cwnd is greater than or equal to ssthresh, the increased cwnd can not exceed max_cwnd.</li></ul></li></ul></blockquote><ul><li>when RTO times out, reset the values of cwnd and ssthresh, update the max_cwnd, and enter to Slow Start state.</li><li>When sending a segment, the minimum value of cwnd and snd_wnd is used to calculate the number of bytes that can be sent.</li></ul><p>The simple state transition diagram of the NewReno is shown below.</p><pre><code>|           ^
| ------------------------
| initialize cwnd ssthresh
V
+------------+
.---------------&gt;| Slow Start |-----------------.
|                +------------+                 |
|                     |  |                      |
|    timeout          |  |  recv dup ack        | recv new ack
|------------------   |  |  ---------------     | ----------------
|reset cwnd ssthresh  |  |  dupack &gt;= 3         | cwnd &gt;= ssthresh
|update max_cwnd      |  |  fr_ack = snd_seq    |
|&lt;--------------------&#39;  |&lt;------------------.  |
|                        |                   |  |
|                        v                   |  V
|                    +--------+     +--------------------+
|                    |   FT   |     |Congestion Avoidance|
|                    +--------+     +--------------------+
|                        |                   ^  |
|              retransmit|lost segment       |  |
|                        |                   |  |
|                        |      recv new ack |  |
|                        v      ------------ |  |
|                    +--------+ ack &gt; fr_ack |  |
|                    |   FR   |--------------&#39;  |
|                    +--------+                 |
|                        |                      |
|                        v                      v
&#39;-----------------------------------------------&#39;
</code></pre><h2 id="configuration-options" tabindex="-1">Configuration Options <a class="header-anchor" href="#configuration-options" aria-label="Permalink to &quot;Configuration Options&quot;">​</a></h2><p><code>NET_TCP_CC_NEWRENO</code></p><p>: Enable or disable NewRenofunction.</p><pre><code>Depends on \`NET_TCP_FAST_RETRANSMIT\`.
</code></pre><h2 id="test" tabindex="-1">Test <a class="header-anchor" href="#test" aria-label="Permalink to &quot;Test&quot;">​</a></h2><h3 id="test-topology" tabindex="-1">Test topology <a class="header-anchor" href="#test-topology" aria-label="Permalink to &quot;Test topology&quot;">​</a></h3><pre><code>IP:10.0.1.1

+--------+
--------| nuttx0 |--------
|       +--------+       |
|          /|\\           |
|           |            |
|       +-------+        |
|       | ifb0  |        |
|       +-------+        |
\\|/         /|\\          \\|/
+-------+       |        +-------+
| tap0  |------/ \\-------| tap1  |
+-------+                +-------+
/|\\                      /|\\
|                        |
\\|/                      \\|/
+-------+                +-------+
sim1 | eth0  |                | eth0  | sim2
+-------+                +-------+

IP:10.0.1.3              IP:10.0.1.4
</code></pre><h3 id="test-steps" tabindex="-1">Test steps <a class="header-anchor" href="#test-steps" aria-label="Permalink to &quot;Test steps&quot;">​</a></h3><p>Test the function on the Ubuntu 22.04 x86_64 with NuttX SIM by following steps:</p><p>1.Configure the test environment</p><p>:</p><ul><li>Set the nuttx0 inbound speed to 10Mbps.</li></ul><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Load fib module, and start ifb0 interface</span></span>
<span class="line"><span>modprobe ifb</span></span>
<span class="line"><span>ip link set dev ifb0 up</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Import the nuttx0 ingress packets into ifb0</span></span>
<span class="line"><span>tc qdisc add dev nuttx0 handle ffff: ingress</span></span>
<span class="line"><span>tc filter add dev nuttx0 parent ffff: u32 match u32 0 0 action mirred egress redirect dev ifb0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Limit nuttx0 ingress 10Mbps</span></span>
<span class="line"><span>tc qdisc add dev ifb0 root tbf rate 10Mbit latency 50ms burst 1540</span></span></code></pre></div></blockquote><ul><li>configure the sim simulator.</li></ul><blockquote><ul><li>Start iperf3 server on ubuntu.</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>iperf3 -s -i1 -p10003  #for sim1</span></span>
<span class="line"><span>iperf3 -s -i1 -p10004  #for sim2</span></span></code></pre></div><ul><li>start the emulators sim1 and sim2 and configure ip addresses.</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># start and configure sim1</span></span>
<span class="line"><span>start gdb nuttx</span></span>
<span class="line"><span>ifconfig eth0 10.0.1.3</span></span>
<span class="line"><span></span></span>
<span class="line"><span># start and configure sim2</span></span>
<span class="line"><span>start gdb nuttx</span></span>
<span class="line"><span>ifconfig eth0 10.0.1.4 # sim2</span></span></code></pre></div></blockquote><p>2.Stream Testing</p><p>:</p><ul><li>Use iperf3 to perform the stream testing.</li></ul><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>iperf3 -c 10.0.1.1 -i1 -t60 -p10003 # sim1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>iperf3 -c 10.0.1.1 -i1 -t60 -p10004 # sim2</span></span></code></pre></div></blockquote><p>3.Comparison Testing</p><p>:</p><blockquote><p>Compares the test results of enabling and disabling NewReno.</p></blockquote><h3 id="test-results" tabindex="-1">Test results <a class="header-anchor" href="#test-results" aria-label="Permalink to &quot;Test results&quot;">​</a></h3><blockquote><p>The test results should indicate that the total network throughput was significantly increased when NewReno congestion control was enabled, which was close to the actual total network bandwidth, and the rates of both sim devices were stable.</p></blockquote>`,36)]))}const g=n(o,[["render",i]]);export{u as __pageData,g as default};
