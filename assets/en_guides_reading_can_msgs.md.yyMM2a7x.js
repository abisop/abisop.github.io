import{_ as n,c as a,al as e,o as p}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"Reading CAN Messages","description":"","frontmatter":{},"headers":[],"relativePath":"en/guides/reading_can_msgs.md","filePath":"en/guides/reading_can_msgs.md"}'),i={name:"en/guides/reading_can_msgs.md"};function l(t,s,r,o,c,d){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="reading-can-messages" tabindex="-1">Reading CAN Messages <a class="header-anchor" href="#reading-can-messages" aria-label="Permalink to &quot;Reading CAN Messages&quot;">​</a></h1><p>Warning</p><p>Migrated from: <a href="https://cwiki.apache.org/confluence/display/NUTTX/Reading+CAN+Messages" target="_blank" rel="noreferrer">https://cwiki.apache.org/confluence/display/NUTTX/Reading+CAN+Messages</a></p><p>Twice now, there have been complaints or issues about reading messages from the CAN driver. The usual concern is that the driver is somehow losing or dropping CAN messages. In these cases, it is often discovered that the CAN driver is being used incorrectly and, as is human nature, the driver itself is blamed for the problem.</p><p>When reading from the CAN driver, multiple messages may be returned, depending on two factors:</p><ol><li>The size of the returned CAN messages.</li><li>The size of the buffer provided to receive CAN messages.</li></ol><p>It should never be assumed that a single message will be returned; making this assumption can lead to lost CAN messages under conditions in which the read buffer can hold more than one small message. The following example shows how to properly handle the CAN read operation:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#define BUFLEN 128  /* Some arbitrary size for the CAN RX buffer */</span></span>
<span class="line"><span></span></span>
<span class="line"><span> FAR struct can_msg_s *msg;</span></span>
<span class="line"><span> char rxbuffer[BUFLEN];</span></span>
<span class="line"><span> ssize_t nread;</span></span>
<span class="line"><span> int nbytes;</span></span>
<span class="line"><span> int msglen</span></span>
<span class="line"><span> int i;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> /* Read messages into the RX buffer */</span></span>
<span class="line"><span></span></span>
<span class="line"><span> nread = read(fd, rxbuffer, BUFLEN);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> /* Check for read errors */</span></span>
<span class="line"><span> ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span> /* Process each message in the RX buffer */</span></span>
<span class="line"><span></span></span>
<span class="line"><span> for (i = 0; i &lt;= nread - CAN_MSGLEN(0); i += msglen)</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span> /* Get the next message from the RX buffer */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     msg    = (FAR struct can_msg_s *)&amp;rxbuffer[i];</span></span>
<span class="line"><span>     nbytes = can_dlc2bytes(msg-&gt;cm_hdr.ch_dlc);</span></span>
<span class="line"><span>     msglen = CAN_MSGLEN(nbytes);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     DEBUGASSERT(i + msglen &lt; BUFLEN);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> /* Process the next CAN message */</span></span>
<span class="line"><span> ...</span></span>
<span class="line"><span> }</span></span></code></pre></div><p>By looping over the read buffer and parsing out each CAN message, it is possible to avoid losing messages that are stored contiguously in the input buffer.</p>`,9)]))}const m=n(i,[["render",l]]);export{h as __pageData,m as default};
