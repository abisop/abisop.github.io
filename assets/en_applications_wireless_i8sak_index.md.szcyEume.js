import{_ as t,c as o,al as a,o as s}from"./chunks/framework.NFAqBSgQ.js";const l=JSON.parse('{"title":"i8sak or i8 IEEE 802.15.4 Swiss Army Knife","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/wireless/i8sak/index.md","filePath":"en/applications/wireless/i8sak/index.md"}'),n={name:"en/applications/wireless/i8sak/index.md"};function i(r,e,d,c,p,h){return s(),o("div",null,e[0]||(e[0]=[a(`<h1 id="i8sak-or-i8-ieee-802-15-4-swiss-army-knife" tabindex="-1"><code>i8sak</code> or <code>i8</code> IEEE 802.15.4 Swiss Army Knife <a class="header-anchor" href="#i8sak-or-i8-ieee-802-15-4-swiss-army-knife" aria-label="Permalink to &quot;\`i8sak\` or \`i8\` IEEE 802.15.4 Swiss Army Knife&quot;">​</a></h1><h2 id="description" tabindex="-1">Description <a class="header-anchor" href="#description" aria-label="Permalink to &quot;Description&quot;">​</a></h2><p>The i8sak app is a useful CLI for testing various IEEE 802.15.4 functionality. It also serves as a starting place for learning how to interface with the NuttX IEEE 802.15.4 MAC layer.</p><p>The i8sak CLI can be used to manipulate multiple MAC layer networks at once. Both a MAC character driver interface and a network interface using sockets are supported. The MAC character driver is used in cases where networking is not enabled and you want your application to use IEEE 802.15.4 directly. In most cases however, you will probably be using 6LoWPAN networking support and therefore, the MAC can be controlled directly from the socket interface rather than the MAC character driver. IEEE 802.15.4 MAC character drivers show up in NuttX as <code>/dev/ieeeN</code> by default.</p><p>When you invoke the first call to i8sak with a specified interface name, it creates an i8sak instance and launches a daemon to handle processing work. The instance is considered sticky, so it is possible to run <code>i8 /dev/ieee0</code> or <code>i8 wpan0</code> at the beginning of a session and then can exclude the interface name from all future calls. The number of i8sak instances supported is controllable through menuconfig.</p><p>The <code>i8sak</code> app has many settings that can be configured. Most options are _<a href="./.html">sticky</a>, meaning, if you set the endpoint short address once, any future operation using the endpoint short address can default to the previously used address. This is particularly useful to keep the command lengths down.</p><h2 id="how-to-use" tabindex="-1">How To Use <a class="header-anchor" href="#how-to-use" aria-label="Permalink to &quot;How To Use&quot;">​</a></h2><p>The i8sak app has a series of CLI functions that can be invoked. The default i8sak command is <code>i8</code> to make things quick and easy to type.</p><p>In my test setup I have 2 Clicker2-STM32 boards from MikroElektronika, with the BEE-click (MRF24J40) radios. Choose one device to be the PAN Coordinator. We&#39;ll refer to that as device A.</p><p>On that device, run:</p><pre><code>i8 /dev/ieee0 startpan cd:ab
</code></pre><p>This will tell the MAC layer that it should now act as a PAN coordinator using PAN ID CD:AB. For now, this function assumes that we are operating a non-beacon enabled PAN, since, as of this writing, beacon-enabled networks are unfinished.</p><p>Configure PAN coordinator short address and EP short address:</p><pre><code>i8 set saddr 0A:00
i8 set ep_saddr 0B:00
</code></pre><p>Next, on the same device, run:</p><pre><code>i8 acceptassoc
</code></pre><p>Notice in the second command, we did not use the devname, again, that is _<a href="./.html">sticky</a> so unless we are switching back and forth between character drivers, we can just use it once.</p><p>The acceptassoc command, without any arguments, informs the <code>i8sak</code> instance to accept all association requests. The acceptassoc command also allows you to only accept requests from a single device by specifying the extended address with option <code>-e</code>.</p><p>For instance:</p><pre><code>i8 acceptassoc -e DEADBEEF00FADE0B
</code></pre><p>But for this example, let&#39;s just use the command with no arguments.</p><p>Now, the second device will act as an endpoint device. The i8sak instance defaults to being in endpoint mode. Let&#39;s refer to the second device as device <code>B</code>.</p><p>On device B, run:</p><pre><code>i8 /dev/ieee0 assoc
</code></pre><p>This command attempts to associate with the node at the configured endpoint address. If everything is setup correctly, device A should have log information saying that a device tried to associate and that it accepted the association. On device <code>B</code>, the console should show that the association request was successful. With all default settings, device B should have been allocated a short address of <code>0x000B</code>.</p><p>If you are following along with a packet sniffer, you should see something similar to the following:</p><pre><code>1) Association Request
    Frame Type      - CMD
    Sequence Number - 0
    Dest. PAN ID    - 0xFADE
    Dest. Address   - 0x000A
    Src.  PAN ID    - 0xFFFE
    Src.  Address   - 0xDEADBEEF00FADE0C
    Command Type    - Association Request

    1a) ACK
        Frame Type      - ACK
        Sequence Number - 0

2) Data Request
    Frame Type      - CMD
    Sequence Number - 1
    Dest. PAN ID    - 0xFADE
    Dest. Address   - 0x000A
    Src.  PAN ID    - 0xFFFE
    Src.  Address   - 0xDEADBEEF00FADE0C
    Command Type    - Data Request

    2a) ACK
        Frame Type      - ACK
        Sequence Number - 1

3) Association Response
    Frame Type      - CMD
    Sequence Number - 0
    Dest. PAN ID    - 0xFADE
    Dest. Address   - 0xDEADBEEF00FADE0C
    Src.  Address   - 0xDEADBEEF00FADE0A
    Command Type    - Association Response
    Assigned SADDR  - 0x000B
    Assoc Status    - Successful

    3a) ACK
        Frame Type      - ACK
        Sequence Number - 0
</code></pre><p>The default endpoint address can be configured via Kconfig or set dynamically using the <code>set</code> command.</p><p>Here is how to set the endpoint short address:</p><pre><code>i8 set ep_saddr 0a:00
</code></pre><p>When setting the address, it&#39;s important to make sure the endpoint addressing mode is configured the way you want: Use <code>s</code> for short addressing or <code>e</code> for extended:</p><pre><code>i8 set ep_addrmode s
</code></pre><p>Device B has now successfully associated with device A. If you want to send data from device B to device A, run the following on device B:</p><pre><code>i8 tx ABCDEF
</code></pre><p>This will immediately (not actually immediate, transaction is sent using CSMA) send the frame to device A with frame payload <code>0xABCDEF</code></p><p>Sending data from device A to device B is different. In IEEE 802.15.4, frames must be extracted from the coordinator. To prepare the frame, run the following command on device A:</p><pre><code>i8 tx AB
</code></pre><p>Because the devmode is PAN Coordinator, the <code>i8sak</code> app knows to send the data as an indirect transaction. If you were running the <code>i8sak</code> app on a device that is a coordinator, but not the PAN coordinator, you can force the <code>i8sak</code> app to send the transaction directly, rather than to the parent coordinator, by using the <code>-d</code> option.</p><p><strong>Note</strong>: Currently, the indirect transaction timeout is disabled. This means frames must be extracted or space may run out. This is only for the testing phase as it is easier to debug when I am not fighting a timeout. Re-enabling the timeout may effect the behavior of the indirect transaction features in the <code>i8sak</code> app.</p><p>To extract the data, run the following command on device <code>B</code>:</p><pre><code>i8 poll
</code></pre><p>This command polls the endpoint (our device A PAN Coordinator in this case) to see if there is any data. In the console of device B you should see a Poll request status print out.</p>`,42)]))}const m=t(n,[["render",i]]);export{l as __pageData,m as default};
