import{_ as s,c as n,al as p,o as e}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"IP Packet Filter","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/net/ipfilter.md","filePath":"en/components/net/ipfilter.md"}'),t={name:"en/components/net/ipfilter.md"};function i(l,a,c,o,r,d){return e(),n("div",null,a[0]||(a[0]=[p(`<h1 id="ip-packet-filter" tabindex="-1">IP Packet Filter <a class="header-anchor" href="#ip-packet-filter" aria-label="Permalink to &quot;IP Packet Filter&quot;">​</a></h1><p>NuttX supports IP packet filter (firewall) compatible with Linux&#39;s iptables and netfilter. It is a stateless packet filter that can be used to filter packets based on source and destination IP addresses, source and destination ports, protocol, and interface.</p><h2 id="workflow" tabindex="-1">Workflow <a class="header-anchor" href="#workflow" aria-label="Permalink to &quot;Workflow&quot;">​</a></h2><p>Similar to Linux&#39;s iptables, NuttX&#39;s IP packet filter defines chains at similar points in the packet processing path. The following diagram shows the packet processing path and the chains that are defined in NuttX&#39;s IP packet filter.</p><pre><code>NIC ──&gt; ipv[46]_input ─┬─&gt; ipv[46]_forward ──&gt; [FORWARD CHAIN] ──&gt; devif_poll_out ──&gt; NIC
                       │                                                 ^
                       │                  ┌─&gt;  tcp  ─┐                   │
                       │                  ├─&gt;  udp  ─┤                   │
                       └─&gt; [INPUT CHAIN] ─┼─&gt; icmp  ─┼─&gt; [OUTPUT CHAIN] ─┘
                                          ├─&gt; icmp6 ─┤
                                          └─&gt;  ...  ─┘
</code></pre><h2 id="configuration-options" tabindex="-1">Configuration Options <a class="header-anchor" href="#configuration-options" aria-label="Permalink to &quot;Configuration Options&quot;">​</a></h2><p><code>CONFIG_NET_IPFILTER</code></p><p>: Enable this option to enable the IP packet filter (firewall).</p><p><code>CONFIG_NET_IPTABLES</code></p><p>: Enable or disable iptables compatible interface (including ip6tables).</p><p><code>CONFIG_SYSTEM_IPTABLES</code></p><p>: Enable support for the &#39;iptables&#39; command.</p><p><code>CONFIG_SYSTEM_IP6TABLES</code></p><p>: Enable support for the &#39;ip6tables&#39; command.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><p>With [iptables]{.title-ref} command, we can add, delete, and list rules in the IP packet filter. It&#39;s similar to the [iptables]{.title-ref} command in Linux.</p><p>The following examples show the commands we support:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; iptables -h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>USAGE: iptables -t table -[AD] chain rule-specification</span></span>
<span class="line"><span>       iptables -t table -I chain [rulenum] rule-specification</span></span>
<span class="line"><span>       iptables -t table -D chain rulenum</span></span>
<span class="line"><span>       iptables -t table -P chain target</span></span>
<span class="line"><span>       iptables -t table -[FL] [chain]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Commands:</span></span>
<span class="line"><span>    --append        -A chain            Append a rule to chain</span></span>
<span class="line"><span>    --insert        -I chain [rulenum]  Insert a rule to chain at rulenum (default = 1)</span></span>
<span class="line"><span>    --delete        -D chain [rulenum]  Delete matching rule from chain</span></span>
<span class="line"><span>    --policy        -P chain target     Set policy for chain to target</span></span>
<span class="line"><span>    --flush         -F [chain]          Delete all rules in chain or all chains</span></span>
<span class="line"><span>    --list          -L [chain]          List all rules in chain or all chains</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Options:</span></span>
<span class="line"><span>    --table         -t table            Table to manipulate (default: filter)</span></span>
<span class="line"><span>    --jump          -j target           Target for rule</span></span>
<span class="line"><span>[!] --in-interface  -i dev              Input network interface name</span></span>
<span class="line"><span>[!] --out-interface -o dev              Output network interface name</span></span>
<span class="line"><span>[!] --source        -s address[/mask]   Source address</span></span>
<span class="line"><span>[!] --destination   -d address[/mask]   Destination address</span></span>
<span class="line"><span>[!] --protocol      -p proto            Protocol (tcp, udp, icmp, esp, all)</span></span>
<span class="line"><span>[!] --source-port,--sport</span></span>
<span class="line"><span>                       port[:port]      Source port</span></span>
<span class="line"><span>[!] --destination-port,--dport</span></span>
<span class="line"><span>                       port[:port]      Destination port</span></span>
<span class="line"><span>[!] --icmp-type        type             ICMP type</span></span>
<span class="line"><span>[!] --icmpv6-type      type             ICMPv6 type</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; iptables -P FORWARD DROP</span></span>
<span class="line"><span>&gt; iptables -I INPUT -i eth0 ! -p icmp -j DROP</span></span>
<span class="line"><span>&gt; iptables -t filter -A FORWARD -p tcp -s 10.0.1.2/24 -d 10.0.3.4/24 -i eth0 -o eth1 --sport 3000:3200 --dport 123:65535 -j ACCEPT</span></span>
<span class="line"><span>&gt; iptables -t filter -I FORWARD 2 -p icmp ! -s 123.123.123.123 ! -i eth0 -o eth1 ! --icmp-type 255 -j REJECT</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; iptables -L</span></span>
<span class="line"><span>Chain INPUT (policy ACCEPT)</span></span>
<span class="line"><span>target        prot  idev  odev  source              destination</span></span>
<span class="line"><span>DROP         !icmp  eth0  any   anywhere            anywhere</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Chain FORWARD (policy DROP)</span></span>
<span class="line"><span>target        prot  idev  odev  source              destination</span></span>
<span class="line"><span>ACCEPT        tcp   eth0  eth1  10.0.1.2/24         10.0.3.4/24        tcp spts:3000:3200 dpts:123:65535</span></span>
<span class="line"><span>REJECT        icmp !eth0  eth1 !123.123.123.123/32  anywhere           icmp !type 255</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Chain OUTPUT (policy ACCEPT)</span></span>
<span class="line"><span>target        prot  idev  odev  source              destination</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ip6tables -P FORWARD DROP</span></span>
<span class="line"><span>&gt; ip6tables -t filter -I FORWARD -p tcp -s fc00::2/64 -d 2001:da8::2:4/64 -i eth0 -o eth1 --sport 3000:3200 --dport 123:65535 -j ACCEPT</span></span>
<span class="line"><span>&gt; ip6tables -t filter -I FORWARD -p icmpv6 -s fc00::2/64 -d 2001:da8::2:4/64 -i eth0 -o eth1 --icmpv6-type 123 -j ACCEPT</span></span>
<span class="line"><span>&gt; ip6tables -t filter -I FORWARD -p tcp -i eth0 -o eth1 --sport 3000 -j ACCEPT</span></span>
<span class="line"><span>&gt; ip6tables -t filter -I FORWARD 1 ! -p tcp ! -s fc00::2/64 ! -d 2001:da8::2:4/64 ! -i eth0 ! -o eth1 ! --sport 3000:3200 ! --dport 0:123 -j DROP</span></span>
<span class="line"><span>&gt; ip6tables -t filter -I FORWARD 3 ! -p icmpv6 ! -s fc00::2/64 -d 2001:da8::2:4/64 ! -i eth0 -o eth1 ! --icmpv6-type 255 -j REJECT</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; ip6tables -L</span></span>
<span class="line"><span>Chain INPUT (policy ACCEPT)</span></span>
<span class="line"><span>target        prot  idev  odev  source              destination</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Chain FORWARD (policy DROP)</span></span>
<span class="line"><span>target        prot  idev  odev  source              destination</span></span>
<span class="line"><span>DROP         !tcp  !eth0 !eth1 !fc00::2/64         !2001:da8::2:4/64   tcp spts:!3000:3200 dpts:!0:123</span></span>
<span class="line"><span>ACCEPT        tcp   eth0  eth1  anywhere            anywhere           tcp spts:3000:3000 dpts:0:65535</span></span>
<span class="line"><span>REJECT       !ipv6-icmp !eth0  eth1 !fc00::2/64          2001:da8::2:4/64   ipv6-icmp !type 255</span></span>
<span class="line"><span>ACCEPT        ipv6-icmp  eth0  eth1  fc00::2/64          2001:da8::2:4/64   ipv6-icmp type 123</span></span>
<span class="line"><span>ACCEPT        tcp   eth0  eth1  fc00::2/64          2001:da8::2:4/64   tcp spts:3000:3200 dpts:123:65535</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Chain OUTPUT (policy ACCEPT)</span></span>
<span class="line"><span>target        prot  idev  odev  source              destination</span></span></code></pre></div>`,20)]))}const f=s(t,[["render",i]]);export{u as __pageData,f as default};
