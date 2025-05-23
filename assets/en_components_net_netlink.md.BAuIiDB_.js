import{_ as e,c as p,j as s,a as n,al as t,o as l}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"Netlink Route support","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/net/netlink.md","filePath":"en/components/net/netlink.md"}'),r={name:"en/components/net/netlink.md"};function c(i,a,o,d,u,_){return l(),p("div",null,a[0]||(a[0]=[s("h1",{id:"netlink-route-support",tabindex:"-1"},[n("Netlink Route support "),s("a",{class:"header-anchor",href:"#netlink-route-support","aria-label":'Permalink to "Netlink Route support"'},"​")],-1),s("p",null,[n("Netlink Route (:c"),s("code",{class:"interpreted-text",role:"macro"},"NETLINK_ROUTE"),n(") allow notifying msg when the network changes. And then apps can obtain these changes by monitoring to netlink socket messages.")],-1),t(`<p>NuttX supports Netlink Route groups</p><ul><li>RTMGRP_IPV4_ROUTE | RTMGRP_IPV6_ROUTE <ul><li>Notify when IPV4|IPV6 routing table changes.</li></ul></li><li>RTMGRP_NEIGH <ul><li>Notify when ARP (IPV4) or neighbors (IPV6) table changes.</li></ul></li><li>RTNLGRP_IPV6_PREFIX <ul><li>Notify when IPV6 prefix changes.</li></ul></li></ul><h2 id="messages-content" tabindex="-1">Messages content <a class="header-anchor" href="#messages-content" aria-label="Permalink to &quot;Messages content&quot;">​</a></h2><ol><li>RTMGRP_IPV4_ROUTE | RTMGRP_IPV6_ROUTE</li></ol><blockquote><p><code>RTM_NEWROUTE</code>, <code>RTM_DELROUTE</code>, <code>RTM_GETROUTE</code>: Create, remove or receive information about a network route. These messages contain an rtmsg structure with 3 optional sequence of rtattr structures following.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct getroute_recvfrom_ipv4addr_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  struct rtattr attr;</span></span>
<span class="line"><span>  in_addr_t     addr;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct getroute_recvfrom_ipv4response_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  struct nlmsghdr hdr;</span></span>
<span class="line"><span>  struct rtmsg    rte;</span></span>
<span class="line"><span>  struct getroute_recvfrom_ipv4addr_s dst;</span></span>
<span class="line"><span>  struct getroute_recvfrom_ipv4addr_s genmask;</span></span>
<span class="line"><span>  struct getroute_recvfrom_ipv4addr_s gateway;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct getroute_recvfrom_ipv6addr_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  struct rtattr  attr;</span></span>
<span class="line"><span>  net_ipv6addr_t addr;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct getroute_recvfrom_ipv6response_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  struct nlmsghdr hdr;</span></span>
<span class="line"><span>  struct rtmsg    rte;</span></span>
<span class="line"><span>  struct getroute_recvfrom_ipv6addr_s dst;</span></span>
<span class="line"><span>  struct getroute_recvfrom_ipv6addr_s genmask;</span></span>
<span class="line"><span>  struct getroute_recvfrom_ipv6addr_s gateway;</span></span>
<span class="line"><span>};</span></span></code></pre></div></blockquote><ol start="2"><li>RTMGRP_NEIGH</li></ol><blockquote><p><code>RTM_NEWNEIGH</code>, <code>RTM_DELNEIGH</code>, <code>RTM_GETNEIGH</code>: Add, remove or receive information about a neighbor table entry (e.g., an ARP entry). The message contains an ndmsg structure and optional sequence of rtattr structures following. And the date will be <code>struct arpreq</code> in <code>include/netinet/arp.h</code>or <code>struct neighbor_entry_s</code> in <code>include/net/neighbor.h</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct getneigh_recvfrom_response_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  struct nlmsghdr hdr;</span></span>
<span class="line"><span>  struct ndmsg    msg;</span></span>
<span class="line"><span>  struct rtattr   attr;</span></span>
<span class="line"><span>  uint8_t         data[1];</span></span>
<span class="line"><span>};</span></span></code></pre></div></blockquote><ol start="3"><li>RTNLGRP_IPV6_PREFIX</li></ol><blockquote><p><code>RTM_NEWPREFIX</code>: Receive information about IPV6 prefix. The message contains an prefixmsg structure and two optional sequence of rtattr structures following. And the <code>addr</code> and <code>prefix_cacheinfo</code> are parsed from the RA message.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct getprefix_recvfrom_addr_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  struct rtattr  attr;</span></span>
<span class="line"><span>  net_ipv6addr_t addr;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct getprefix_recvfrom_cache_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  struct rtattr           attr;</span></span>
<span class="line"><span>  struct prefix_cacheinfo pci;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct getprefix_recvfrom_response_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  struct nlmsghdr  hdr;</span></span>
<span class="line"><span>  struct prefixmsg pmsg;</span></span>
<span class="line"><span>  struct getprefix_recvfrom_addr_s  prefix;</span></span>
<span class="line"><span>  struct getprefix_recvfrom_cache_s pci;</span></span>
<span class="line"><span>};</span></span></code></pre></div></blockquote><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct sockaddr_nl addr;</span></span>
<span class="line"><span>struct nlmsghdr *hdr;</span></span>
<span class="line"><span>uint8_t buffer[BUFSIZE];</span></span>
<span class="line"><span>int sd = socket(AF_NETLINK, SOCK_RAW, NETLINK_ROUTE); </span></span>
<span class="line"><span></span></span>
<span class="line"><span>addr.nl_family  = AF_NETLINK;</span></span>
<span class="line"><span>addr.nl_groups  = RTMGRP_IPV4_ROUTE | RTMGRP_IPV6_ROUTE |</span></span>
<span class="line"><span>                  RTMGRP_NEIGH | RTMGRP_IPV6_PREFIX;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bind(sd, (FAR struct sockaddr *)&amp;addr, sizeof(addr)); /* Bind to device */</span></span>
<span class="line"><span>while (1)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    recv(sd, buf, BUFSIZE, 0);</span></span>
<span class="line"><span>    for (hdr = buf; NLMSG_OK(hdr, ret); hdr = NLMSG_NEXT(hdr, ret))</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        if (hdr-&gt;nlmsg_type == RTM_...)</span></span>
<span class="line"><span>          {</span></span>
<span class="line"><span>            /* Func parsed netlink msg*/</span></span>
<span class="line"><span>            ...</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>close(sd); /* Close the socket */</span></span></code></pre></div>`,11)]))}const m=e(r,[["render",c]]);export{h as __pageData,m as default};
