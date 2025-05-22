import{_ as p,c as t,al as a,j as n,a as e,o as i}from"./chunks/framework.NFAqBSgQ.js";const N=JSON.parse('{"title":"Network Address Translation (NAT)","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/net/nat.md","filePath":"en/components/net/nat.md"}'),l={name:"en/components/net/nat.md"};function o(c,s,d,r,u,h){return i(),t("div",null,s[0]||(s[0]=[a(`<h1 id="network-address-translation-nat" tabindex="-1">Network Address Translation (NAT) <a class="header-anchor" href="#network-address-translation-nat" aria-label="Permalink to &quot;Network Address Translation (NAT)&quot;">​</a></h1><p>NuttX supports full cone or symmetric NAT logic, which currently supports</p><ul><li>TCP</li><li>UDP</li><li>ICMP <ul><li>ECHO (REQUEST &amp; REPLY)</li><li>Error Messages (DEST_UNREACHABLE &amp; TIME_EXCEEDED &amp; PARAMETER_PROBLEM)</li></ul></li></ul><h2 id="workflow" tabindex="-1">Workflow <a class="header-anchor" href="#workflow" aria-label="Permalink to &quot;Workflow&quot;">​</a></h2><pre><code>Local Network (LAN)                          External Network (WAN)
                  |----------------|
     &lt;local IP,   |                | &lt;external IP,             &lt;peer IP,
       -----------|                |-----------------------------
      local port&gt; |                |  external port&gt;            peer port&gt;
                  |----------------|
</code></pre><ul><li>Outbound <ul><li><strong>LAN</strong> -&gt; <strong>Forward</strong> -&gt; <strong>NAT</strong> (only if targeting at WAN) -&gt; <strong>WAN</strong></li><li>All packets from <strong>LAN</strong> and targeting at <strong>WAN</strong> will be masqueraded with <code>local ip:port</code> changed to <code>external ip:port</code>.</li></ul></li><li>Inbound <ul><li><strong>WAN</strong> -&gt; <strong>NAT</strong> (only from WAN, change destination) -&gt; <strong>Forward</strong> -&gt; <strong>LAN</strong></li><li>Packets from <strong>WAN</strong> will try to be changed back from <code>external ip:port</code> to <code>local ip:port</code> and send to <strong>LAN</strong>.</li></ul></li></ul><h2 id="configuration-options" tabindex="-1">Configuration Options <a class="header-anchor" href="#configuration-options" aria-label="Permalink to &quot;Configuration Options&quot;">​</a></h2><p><code>CONFIG_NET_NAT</code></p><p>: Enable or disable Network Address Translation (NAT) function. Depends on <code>CONFIG_NET_IPFORWARD</code>.</p><p><code>CONFIG_NET_NAT44</code> &amp; <code>CONFIG_NET_NAT66</code></p><p>: Enable or disable NAT on IPv4 / IPv6. Depends on <code>CONFIG_NET_NAT</code>.</p><p><code>CONFIG_NET_NAT44_FULL_CONE</code> &amp; <code>CONFIG_NET_NAT66_FULL_CONE</code></p><p>: Enable Full Cone NAT logic. Full Cone NAT is easier to traverse than Symmetric NAT, and uses less resources than Symmetric NAT.</p><p><code>CONFIG_NET_NAT44_SYMMETRIC</code> &amp; <code>CONFIG_NET_NAT66_SYMMETRIC</code></p><p>: Enable Symmetric NAT logic. Symmetric NAT will be safer than Full Cone NAT, be more difficult to traverse, and has more entries which may lead to heavier load.</p><p><code>CONFIG_NET_NAT_HASH_BITS</code></p><p>: The bits of the hashtable of NAT entries, hashtable has (1 &lt;&lt; bits) buckets.</p><p><code>CONFIG_NET_NAT_TCP_EXPIRE_SEC</code></p><p>: The expiration time for idle TCP entry in NAT. The default value 86400 is suggested by RFC2663, Section 2.6, Page 5. But we may set it to shorter time like 240s for better performance.</p><p><code>CONFIG_NET_NAT_UDP_EXPIRE_SEC</code></p><p>: The expiration time for idle UDP entry in NAT.</p><p><code>CONFIG_NET_NAT_ICMP_EXPIRE_SEC</code></p><p>: The expiration time for idle ICMP entry in NAT.</p><p><code>CONFIG_NET_NAT_ICMPv6_EXPIRE_SEC</code></p><p>: The expiration time for idle ICMPv6 entry in NAT.</p><p><code>CONFIG_NET_NAT_ENTRY_RECLAIM_SEC</code></p><p>: The time to auto reclaim all expired NAT entries. A value of zero will disable auto reclaiming. Expired entries will be automatically reclaimed when matching inbound/outbound entries, so this config does not have significant impact when NAT is normally used, but very useful when the hashtable is big and there are only a few connections using NAT (which will only trigger reclaiming on a few chains in hashtable).</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2>`,28),n("blockquote",null,[n("ul",null,[n("li",null,[e(":c"),n("code",{class:"interpreted-text",role:"func"},"nat_enable()")]),n("li",null,[e(":c"),n("code",{class:"interpreted-text",role:"func"},"nat_disable()")])])],-1),a(`<h2 id="validation" tabindex="-1">Validation <a class="header-anchor" href="#validation" aria-label="Permalink to &quot;Validation&quot;">​</a></h2><p>Validated on Ubuntu 22.04 x86_64 with NuttX SIM by following steps:</p><ol><li>Configure NuttX with &gt;=2 TAP devices (host route mode) and NAT enabled:</li></ol><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CONFIG_NET_IPFORWARD=y</span></span>
<span class="line"><span>CONFIG_NET_NAT=y</span></span>
<span class="line"><span># CONFIG_SIM_NET_BRIDGE is not set</span></span>
<span class="line"><span>CONFIG_SIM_NETDEV_NUMBER=2</span></span></code></pre></div></blockquote><ol start="2"><li>Call <code>nat_enable</code> on one dev on startup, or manually enable NAT with <code>iptables</code> command (either may work).</li></ol><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* arch/sim/src/sim/up_netdriver.c */</span></span>
<span class="line"><span>int netdriver_init(void)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  nat_enable(&amp;g_sim_dev[0]);</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span></code></pre></div></blockquote><ol start="3"><li>Set IP Address for NuttX on startup</li></ol><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ifconfig eth0 10.0.1.2</span></span>
<span class="line"><span>ifup eth0</span></span>
<span class="line"><span>ifconfig eth1 10.0.10.2</span></span>
<span class="line"><span>ifup eth1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># IPv6 if you need</span></span>
<span class="line"><span>ifconfig eth0 inet6 add fc00:1::2/64 gw fc00:1::1</span></span>
<span class="line"><span>ifconfig eth1 inet6 add fc00:10::2/64</span></span></code></pre></div></blockquote><ol start="4"><li>Configure IP &amp; namespace &amp; route on host side (maybe need to be root, then try <code>sudo -i</code>)</li></ol><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>IF_HOST=&quot;enp1s0&quot;</span></span>
<span class="line"><span>IF_0=&quot;tap0&quot;</span></span>
<span class="line"><span>IP_HOST_0=&quot;10.0.1.1&quot;</span></span>
<span class="line"><span>IF_1=&quot;tap1&quot;</span></span>
<span class="line"><span>IP_HOST_1=&quot;10.0.10.1&quot;</span></span>
<span class="line"><span>IP_NUTTX_1=&quot;10.0.10.2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># add net namespace LAN for IF_1</span></span>
<span class="line"><span>ip netns add LAN</span></span>
<span class="line"><span>ip netns exec LAN sysctl -w net.ipv4.ip_forward=1</span></span>
<span class="line"><span>ip link set IF_1 netns LAN</span></span>
<span class="line"><span>ip netns exec LAN ip link set IF_1 up</span></span>
<span class="line"><span>ip netns exec LAN ip link set lo up</span></span>
<span class="line"><span></span></span>
<span class="line"><span># add address and set default route</span></span>
<span class="line"><span>ip addr add IP_HOST_0/24 dev IF_0</span></span>
<span class="line"><span>ip netns exec LAN ip addr add IP_HOST_1/24 dev IF_1</span></span>
<span class="line"><span>ip netns exec LAN ip route add default dev IF_1 via IP_NUTTX_1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># nat to allow NuttX to access the internet</span></span>
<span class="line"><span>iptables -t nat -A POSTROUTING -o IF_HOST -j MASQUERADE</span></span>
<span class="line"><span>iptables -A FORWARD -i IF_HOST -o IF_0 -j ACCEPT</span></span>
<span class="line"><span>iptables -A FORWARD -i IF_0 -o IF_HOST -j ACCEPT</span></span>
<span class="line"><span>sysctl -w net.ipv4.ip_forward=1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># IPv6 if you need</span></span>
<span class="line"><span>IP6_HOST_0=&quot;fc00:1::1&quot;</span></span>
<span class="line"><span>IP6_HOST_1=&quot;fc00:10::1&quot;</span></span>
<span class="line"><span>IP6_NUTTX_1=&quot;fc00:10::2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># add address and set default route</span></span>
<span class="line"><span>ip -6 addr add IP6_HOST_0/64 dev IF_0</span></span>
<span class="line"><span>ip netns exec LAN ip -6 addr add IP6_HOST_1/64 dev IF_1</span></span>
<span class="line"><span>ip netns exec LAN ip -6 route add default dev IF_1 via IP6_NUTTX_1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># nat to allow NuttX to access the internet</span></span>
<span class="line"><span>ip6tables -t nat -A POSTROUTING -o IF_HOST -j MASQUERADE</span></span>
<span class="line"><span>ip6tables -A FORWARD -i IF_HOST -o IF_0 -j ACCEPT</span></span>
<span class="line"><span>ip6tables -A FORWARD -i IF_0 -o IF_HOST -j ACCEPT</span></span>
<span class="line"><span>sysctl -w net.ipv6.conf.all.forwarding=1</span></span></code></pre></div></blockquote><ol start="5"><li>Do anything in the LAN namespace will go through NAT</li></ol><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Host side</span></span>
<span class="line"><span>iperf -B 10.0.1.1 -s -i 1</span></span>
<span class="line"><span># LAN side</span></span>
<span class="line"><span>sudo ip netns exec LAN iperf -B 10.0.10.1 -c 10.0.1.1 -i 1</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Host side</span></span>
<span class="line"><span>python3 -m http.server -b ::</span></span>
<span class="line"><span># LAN side</span></span>
<span class="line"><span>for i in {1..20000}; do sudo ip netns exec LAN curl &#39;http://10.0.1.1:8000/&#39; &gt; /dev/null 2&gt;1; done</span></span>
<span class="line"><span>for i in {1..20000}; do sudo ip netns exec LAN curl &#39;http://[fc00:1::1]:8000/&#39; &gt; /dev/null 2&gt;1; done</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># LAN side</span></span>
<span class="line"><span>sudo ip netns exec LAN ping 8.8.8.8</span></span>
<span class="line"><span>sudo ip netns exec LAN ping 2001:4860:4860::8888</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># LAN side</span></span>
<span class="line"><span>sudo ip netns exec LAN traceroute -n 8.8.8.8     # ICMP error msg of UDP</span></span>
<span class="line"><span>sudo ip netns exec LAN traceroute -n -T 8.8.8.8  # ICMP error msg of TCP</span></span>
<span class="line"><span>sudo ip netns exec LAN traceroute -n -I 8.8.8.8  # ICMP error msg of ICMP</span></span>
<span class="line"><span>sudo ip netns exec LAN traceroute -n 2001:4860:4860::8888</span></span>
<span class="line"><span>sudo ip netns exec LAN traceroute -n -T 2001:4860:4860::8888</span></span>
<span class="line"><span>sudo ip netns exec LAN traceroute -n -I 2001:4860:4860::8888</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Host side</span></span>
<span class="line"><span>tcpdump -nn -i tap0</span></span>
<span class="line"><span># LAN side</span></span>
<span class="line"><span>sudo ip netns exec LAN tcpdump -nn -i tap1</span></span></code></pre></div></blockquote>`,12)]))}const g=p(l,[["render",o]]);export{N as __pageData,g as default};
