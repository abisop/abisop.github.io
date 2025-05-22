import{_ as s,c as a,al as e,o as p}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"Network Drivers","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/net/netdriver.md","filePath":"en/components/net/netdriver.md"}'),t={name:"en/components/net/netdriver.md"};function l(i,n,r,c,o,d){return p(),a("div",null,n[0]||(n[0]=[e(`<h1 id="network-drivers" tabindex="-1">Network Drivers <a class="header-anchor" href="#network-drivers" aria-label="Permalink to &quot;Network Drivers&quot;">​</a></h1><p>The NuttX network driver is split into two parts:</p><ol><li>An &quot;upper half&quot;, generic driver that provides the common network interface to application level code, and</li><li>A &quot;lower half&quot;, platform-specific driver that implements the low-level timer controls to implement the network functionality.</li></ol><p>Files supporting network driver can be found in the following locations:</p><ul><li><strong>Interface Definition</strong>. The header file for the NuttX network driver resides at <code>include/nuttx/net/netdev_lowerhalf.h</code>. This header file includes the interface between the &quot;upper half&quot; and &quot;lower half&quot; drivers.</li><li><strong>&quot;Upper Half&quot; Driver</strong>. The generic, &quot;upper half&quot; network driver resides at <code>drivers/net/netdev_upperhalf.c</code>.</li><li><strong>&quot;Lower Half&quot; Drivers</strong>. Platform-specific network drivers reside in <code>arch/&lt;architecture&gt;/src/&lt;hardware&gt;</code> or <code>drivers/net</code> directory for the specific processor <code>&lt;architecture&gt;</code> and for the specific <code>&lt;chip&gt;</code> network peripheral devices.</li></ul><p><strong>Special Note</strong>: Not all network drivers are implemented with this architecture. Known lower-half drivers: <code>arch/sim/src/sim/sim_netdriver.c</code>, <code>drivers/virtio/virtio-net.c</code></p><h2 id="how-to-change-full-network-driver-into-lower-half-one" tabindex="-1">How to change full network driver into lower-half one <a class="header-anchor" href="#how-to-change-full-network-driver-into-lower-half-one" aria-label="Permalink to &quot;How to change full network driver into lower-half one&quot;">​</a></h2><p>We have many network drivers that are implemented as full network drivers with <code>include/nuttx/net/netdev.h</code>, we can change them into lower-half drivers to remove the common code (which is already in upper-half driver). Here is a guide to do so:</p><ol><li>Change <code>struct net_driver_s</code> to <code>struct netdev_lowerhalf_s</code> in the network driver structure. If you really need to touch some fields inside <code>struct net_driver_s</code> like MAC address, you can access them through <code>struct netdev_lowerhalf_s::netdev</code>.</li><li>Change the function names called in the network driver file to the names with prefix <code>netdev_lower_</code>, e.g. <code>netdev_lower_register</code> and <code>netdev_lower_carrier_on</code>.</li><li>Change the core functions called by work queue like <code>txpoll</code> as <code>transmit</code> and <code>receive</code> in the <code>netdev_ops_s</code> structure. You may need to change <code>memcpy</code> for <code>d_buf</code> into <code>netpkt_copyin</code> and <code>netpkt_copyout</code>. <ul><li>Note that the <code>receive</code> function just need to return the received packet instead of calling functions like <code>ipv4_input</code> or doing reply. The upper-half will call <code>receive</code> to get all packets until it returns <code>NULL</code> and send these packets into the network stack.</li><li>Also remember to call <code>netpkt_free</code> for the transmitted packets.</li></ul></li><li>Remove work queues related to send and receive, and replace them with calling <code>netdev_lower_txdone</code> and <code>netdev_lower_rxready</code>. Then the upper-half driver will call <code>transmit</code> and <code>receive</code> to send/get packets.</li><li>Remove any buffer related to <code>d_buf</code>, and make sure <code>d_buf</code> is not used in the lower-half driver.</li><li>Remove <code>txavail</code> function, the upper-half driver will call <code>transmit</code> when it has packets to send.</li><li>Remove the statistics macros like <code>NETDEV_TXPACKETS</code>, <code>NETDEV_TXDONE</code>, <code>NETDEV_RXPACKETS</code> or <code>NETDEV_RXDROPPED</code>, these macros are well handled in upper-half. But you may still keep macros like <code>NETDEV_TXTIMEOUTS</code> and <code>NETDEV_RXERRORS</code> because the upper-half cannot know whether these error happens.</li><li>Find a suitable <code>quota</code> for the driver, and set it in the driver initialization function. The quota is the maximum number of buffers that the driver can hold at the same time. For example, if the TX quota is set to 5, it means that if the driver has 5 unreleased packets (<code>netpkt_free</code>), the upper-half will not call <code>transmit</code> until they are released. <ul><li>Note: An exception is that if the net stack is replying for RX packet, this replied packet will always be put into <code>transmit</code>, which may exceed the TX quota temporarily.</li></ul></li></ol><h2 id="lower-half-example" tabindex="-1">&quot;Lower Half&quot; Example <a class="header-anchor" href="#lower-half-example" aria-label="Permalink to &quot;\\&quot;Lower Half\\&quot; Example&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct &lt;chip&gt;_priv_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  /* This holds the information visible to the NuttX network */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  struct netdev_lowerhalf_s dev;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>static const struct netdev_ops_s g_ops =</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  .ifup     = &lt;chip&gt;_ifup,</span></span>
<span class="line"><span>  .ifdown   = &lt;chip&gt;_ifdown,</span></span>
<span class="line"><span>  .transmit = &lt;chip&gt;_transmit,</span></span>
<span class="line"><span>  .receive  = &lt;chip&gt;_receive,</span></span>
<span class="line"><span>  .addmac   = &lt;chip&gt;_addmac,</span></span>
<span class="line"><span>  .rmmac    = &lt;chip&gt;_rmmac,</span></span>
<span class="line"><span>  .ioctl    = &lt;chip&gt;_ioctl</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* The Wi-Fi driver registration function can be implemented as follows,</span></span>
<span class="line"><span> * where &lt;chip&gt; refers to the chip name.  netdev_lower_register() is the</span></span>
<span class="line"><span> * network device interface provided by upper-half drivers to register</span></span>
<span class="line"><span> * network device drivers.</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int &lt;chip&gt;_netdev_init(FAR struct &lt;chip&gt;_priv_s *priv)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    FAR struct netdev_lowerhalf_s *dev = &amp;priv-&gt;dev;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    dev-&gt;ops = &amp;g_ops;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /* The maximum number of buffers that the driver can hold</span></span>
<span class="line"><span>     * at the same time.  For example, if the TX quota is set to 5, it</span></span>
<span class="line"><span>     * means that if the driver has 5 unreleased packets (netpkt_free),</span></span>
<span class="line"><span>     * the upper layer will not call transmit until they are released.</span></span>
<span class="line"><span>     * After the rx quota is used up and no new buffer can be allocated</span></span>
<span class="line"><span>     * (netpkt_alloc), it needs to notify the upper layer</span></span>
<span class="line"><span>     * (netdev_lower_rxready) and restore the quota by submitting buffer</span></span>
<span class="line"><span>     * back through receive function.</span></span>
<span class="line"><span>     * If the driver processes each packet individually (without</span></span>
<span class="line"><span>     * accumulating multiple packets before sending/receiving), it can be</span></span>
<span class="line"><span>     * set to 1.</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    dev-&gt;quota[NETPKT_TX] = 1;</span></span>
<span class="line"><span>    dev-&gt;quota[NETPKT_RX] = 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return netdev_lower_register(dev, NET_LL_ETHERNET);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* The transmit function can be implemented as follows, where &lt;chip&gt;</span></span>
<span class="line"><span> * refers to the chip name.</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>static int &lt;chip&gt;_transmit(FAR struct netdev_lowerhalf_s *dev,</span></span>
<span class="line"><span>                           FAR netpkt_t *pkt)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  FAR struct &lt;chip&gt;_priv_s *priv = (FAR struct &lt;chip&gt;_priv_s *)dev;</span></span>
<span class="line"><span>  unsigned int len = netpkt_getdatalen(dev, pkt);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#if you want to do offloading</span></span>
<span class="line"><span>  if (!netpkt_is_fragmented(pkt))</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      /* Contiguous memory, just use data pointer */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      FAR uint8_t *databuf = netpkt_getdata(dev, pkt);</span></span>
<span class="line"><span>      FAR uint8_t *devbuf  = databuf - sizeof(struct &lt;chip&gt;_txhead_s);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      /* Do Transmit.  Note: \`databuf\` points to the L2 data, and there is</span></span>
<span class="line"><span>       * a reserved memory with size of \`CONFIG_NET_LL_GUARDSIZE\` before</span></span>
<span class="line"><span>       * databuf to be used for driver header, drivers can just fill data</span></span>
<span class="line"><span>       * there (\`devbuf\`) and start the transmission.</span></span>
<span class="line"><span>       */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      /* Copyout the L2 data and transmit. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      uint8_t devbuf[1600];</span></span>
<span class="line"><span>      netpkt_copyout(dev, devbuf, pkt, len, 0);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      /* Do Transmit */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return OK;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>static void &lt;chip&gt;_txdone_interrupt(FAR struct &lt;chip&gt;_priv_s *priv)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  FAR struct netdev_lowerhalf_s *dev = &amp;priv-&gt;dev;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* Perform some processing in the driver (if necessary) */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* Free the buffer and notify the upper layer */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  netpkt_free(dev, pkt, NETPKT_TX);</span></span>
<span class="line"><span>  netdev_lower_txdone(dev);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* The receive function can be implemented as follows, where &lt;chip&gt;</span></span>
<span class="line"><span> * refers to the chip name.</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>static void &lt;chip&gt;_rxready_interrupt(FAR struct &lt;chip&gt;_priv_s *priv)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  FAR struct netdev_lowerhalf_s *dev = &amp;priv-&gt;dev;</span></span>
<span class="line"><span>  netdev_lower_rxready(dev);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>static FAR netpkt_t *&lt;chip&gt;_receive(FAR struct netdev_lowerhalf_s *dev)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  /* It is also possible to allocate the pkt and receive the data in</span></span>
<span class="line"><span>   * advance, and then call rxready and return pkt through receive</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  FAR netpkt_t *pkt = netpkt_alloc(dev, NETPKT_RX);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (pkt)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>#if NETPKT_BUFLEN &gt; 15xx &amp;&amp; you want to do offloading</span></span>
<span class="line"><span>      /* Write directly to the buffer inside pkt, len corresponds to the</span></span>
<span class="line"><span>       * length of L2 data (need the NETPKT_BUFLEN to be large enough to</span></span>
<span class="line"><span>       * hold the data).  The \`&lt;chip&gt;_rxhead_s\` is the driver header before</span></span>
<span class="line"><span>       * the actual data (maybe you don&#39;t have).</span></span>
<span class="line"><span>       */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      len = receive_data_into(netpkt_getbase(pkt));</span></span>
<span class="line"><span>      netpkt_resetreserved(&amp;priv-&gt;dev, pkt, sizeof(struct &lt;chip&gt;_rxhead_s));</span></span>
<span class="line"><span>      netpkt_setdatalen(&amp;priv-&gt;dev, pkt, len);</span></span>
<span class="line"><span>#else</span></span>
<span class="line"><span>      uint8_t devbuf[1600];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      /* Copy from src, len corresponds to the length of L2 data, you can</span></span>
<span class="line"><span>       * always use this method to receive data.  The \`&lt;chip&gt;_rxhead_s\` is</span></span>
<span class="line"><span>       * the driver header before the actual data (maybe you don&#39;t have).</span></span>
<span class="line"><span>       */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      len = receive_data_into(devbuf);</span></span>
<span class="line"><span>      netpkt_copyin(dev, pkt, devbuf + sizeof(struct &lt;chip&gt;_rxhead_s), len, 0);</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return pkt;</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,11)]))}const v=s(t,[["render",l]]);export{u as __pageData,v as default};
