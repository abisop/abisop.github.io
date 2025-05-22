import{_ as n,c as t,al as a,o}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"FAQ","description":"","frontmatter":{},"headers":[],"relativePath":"en/faq/index.md","filePath":"en/faq/index.md"}'),i={name:"en/faq/index.md"};function r(s,e,l,p,d,c){return o(),t("div",null,e[0]||(e[0]=[a(`<p>Create new subsections as needed.</p><h1 id="faq" tabindex="-1">FAQ <a class="header-anchor" href="#faq" aria-label="Permalink to &quot;FAQ&quot;">​</a></h1><h2 id="nsh-tricks" tabindex="-1">NSH Tricks <a class="header-anchor" href="#nsh-tricks" aria-label="Permalink to &quot;NSH Tricks&quot;">​</a></h2><h3 id="how-to-get-an-application-available-in-the-nsh" tabindex="-1">How to get an application available in the NSH? <a class="header-anchor" href="#how-to-get-an-application-available-in-the-nsh" aria-label="Permalink to &quot;How to get an application available in the NSH?&quot;">​</a></h3><p>You will need at least three things enabled inside NuttX menuconfig to be able to see an application this displayed there: BUILTIN, NSH_BUILTIN_APPS and the application itself. Enabling BUILTIN:</p><pre><code>Library Routines  ---&gt;
        [*] Support Builtin Applications
</code></pre><p>Enabling NSH_BUILTIN_APPS:</p><pre><code>Application Configuration  ---&gt;
        NSH Library  ---&gt;
            [*]   Enable built-in applications
</code></pre><p>Enabling Hello World Application:</p><pre><code>Application Configuration  ---&gt;
        Examples  ---&gt;
            [*]   &quot;Hello, World!&quot; example
</code></pre><p>After compilation you should see the hello at NSH:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>NuttShell (NSH) NuttX-12.5.1</span></span>
<span class="line"><span>nsh&gt; ?</span></span>
<span class="line"><span>help usage:  help [-v] [&lt;cmd&gt;]</span></span>
<span class="line"><span>  .           cp          exit        mkdir       set         unset</span></span>
<span class="line"><span>  [           cmp         expr        mkrd        sleep       uptime</span></span>
<span class="line"><span>  ?           dirname     false       mount       source      usleep</span></span>
<span class="line"><span>  alias       dd          fdinfo      mv          test        xd</span></span>
<span class="line"><span>  unalias     df          free        pidof       time</span></span>
<span class="line"><span>  basename    dmesg       help        printf      true</span></span>
<span class="line"><span>  break       echo        hexdump     pwd         truncate</span></span>
<span class="line"><span>  cat         env         kill        rm          uname</span></span>
<span class="line"><span>  cd          exec        ls          rmdir       umount</span></span>
<span class="line"><span>Builtin Apps:</span></span>
<span class="line"><span>  hello        nsh          sh</span></span>
<span class="line"><span>nsh&gt;</span></span></code></pre></div><p>Note: if you want to see the applications physically at /bin you can enable BINFS:</p><pre><code>File Systems  ---&gt;
        [*] BINFS File System
</code></pre><h3 id="how-to-increase-the-command-line-length" tabindex="-1">How to increase the command line length? <a class="header-anchor" href="#how-to-increase-the-command-line-length" aria-label="Permalink to &quot;How to increase the command line length?&quot;">​</a></h3><p>You can increase the Max command line length from 64 to other value, this way:</p><pre><code>Application Configuration  ---&gt;
        NSH Library  ---&gt;
            Command Line Configuration  ---&gt;
                (64) Max command line length
</code></pre><h3 id="how-do-i-enable-editing-support-on-the-command-line" tabindex="-1">How do I enable editing support on the command line? <a class="header-anchor" href="#how-do-i-enable-editing-support-on-the-command-line" aria-label="Permalink to &quot;How do I enable editing support on the command line?&quot;">​</a></h3><p>You need to change Command Line Editor from &quot;Minimal readline&quot; to &quot;Command Line Editor&quot;, this way:</p><pre><code>Application Configuration  ---&gt;
    NSH Library  ---&gt;
        Command Line Configuration  ---&gt;
            Command Line Editor (Command Line Editor)  ---&gt;
</code></pre><h3 id="how-to-enable-command-line-history" tabindex="-1">How to enable command line history? <a class="header-anchor" href="#how-to-enable-command-line-history" aria-label="Permalink to &quot;How to enable command line history?&quot;">​</a></h3><p>You need to enable these options in the menuconfig:</p><pre><code>Application Configuration  ---&gt;
    System Libraries and NSH Add-Ons  ---&gt;
        -*- readline() Support  ---&gt;
            [*]     Command line history
            (80)      Command line history length
            (16)      Command line history records
</code></pre><p>Note: If you are using the &quot;Command Line Editor&quot; instead of the &quot;readline&quot; then you need to use this other option:</p><pre><code>Application Configuration  ---&gt;
    System Libraries and NSH Add-Ons  ---&gt;
        -*- EMACS-like Command Line Editor  ---&gt;
            [*]   Command line history
            (80)    Command line history length
            (16)    Command line history records
</code></pre><h3 id="how-to-enable-autocomplete-on-the-command-line" tabindex="-1">How to enable autocomplete on the command line? <a class="header-anchor" href="#how-to-enable-autocomplete-on-the-command-line" aria-label="Permalink to &quot;How to enable autocomplete on the command line?&quot;">​</a></h3><p>You need to enable these options in the menuconfig:</p><pre><code>Application Configuration  ---&gt;
    System Libraries and NSH Add-Ons  ---&gt;
        -*- readline() Support  ---&gt;
            [*]     Tab completion
            (64)      Maximum built-in matches
            (64)      Maximum external command matches
</code></pre><p>Note: autocomplete is not enabled when &quot;Command Line Editor&quot; instead of the &quot;readline&quot;.</p><h3 id="how-to-interrupt-an-nsh-application-using-ctrl-c" tabindex="-1">How to interrupt an NSH Application using Ctrl^C ? <a class="header-anchor" href="#how-to-interrupt-an-nsh-application-using-ctrl-c" aria-label="Permalink to &quot;How to interrupt an NSH Application using Ctrl\\^C ?&quot;">​</a></h3><p>You need to enable these options in the menuconfig:</p><pre><code>RTOS Features ---&gt;
    Signal Configuration ---&gt;
        [*] Default signal actions ---&gt;
            [*] SIGINT and SIGKILL
Device Drivers ---&gt;
    Serial Driver Support ---&gt;
        [*] Serial TERMIOS support
        [*]   Support SIGINT
        (0x03)  Serial parse SIGINT characters
</code></pre><h2 id="board-initialization" tabindex="-1">Board Initialization <a class="header-anchor" href="#board-initialization" aria-label="Permalink to &quot;Board Initialization&quot;">​</a></h2><h3 id="how-to-start-directly-my-application-instead-starting-nsh" tabindex="-1">How to start directly my application instead starting NSH? <a class="header-anchor" href="#how-to-start-directly-my-application-instead-starting-nsh" aria-label="Permalink to &quot;How to start directly my application instead starting NSH?&quot;">​</a></h3><p>You can start you application directly instead of starting the default NSH terminal. Lets support your application is called &quot;hello&quot;, then you will modify the ENTRYPOINT to call &quot;hello_main&quot; instead of &quot;nsh_main&quot;:</p><pre><code>RTOS Features ---&gt;
    Tasks and Scheduling  ---&gt;
        (hello_main) Application entry point
</code></pre><h3 id="why-after-putting-my-application-on-entrypoint-it-stops-to-work" tabindex="-1">Why after putting my application on ENTRYPOINT it stops to work? <a class="header-anchor" href="#why-after-putting-my-application-on-entrypoint-it-stops-to-work" aria-label="Permalink to &quot;Why after putting my application on ENTRYPOINT it stops to work?&quot;">​</a></h3><p>When you replace the ENTRYPOINT from &quot;nsh_main&quot; to your application some initialization flow are changed, for instance the NSH_ARCHINIT is not executed anymore and so some drivers initialization that are called from it also stops to work.</p><p>You can fix it enabling the Board Late Initialization that will replace the NSH_ARCHINIT to call those drivers initialization. Just enable it:</p><pre><code>RTOS Features ---&gt;
    RTOS hooks ---&gt;
        [*] Custom board late initialization
</code></pre><p>Also you need to disable the architecture-specific initialization:</p><pre><code>Application Configuration ---&gt;
    NSH Library ---&gt;
        [ ] Have architecture-specific initialization
</code></pre><h3 id="why-isn-t-dev-ttysx-created-when-using-usb-console-even-when-uart-is-enabled" tabindex="-1">Why isn&#39;t /dev/ttySx created when using USB Console even when UART is enabled? <a class="header-anchor" href="#why-isn-t-dev-ttysx-created-when-using-usb-console-even-when-uart-is-enabled" aria-label="Permalink to &quot;Why isn\\&#39;t /dev/ttySx created when using USB Console even when UART is enabled?&quot;">​</a></h3><p>If you don&#39;t use serial console then /dev/ttyS0 will not be created, even if you enable the UART peripheral at &quot;System Type&quot;.</p><p>You can fix it enabling the Serial Upper-Half Driver:</p><pre><code>Device Drivers ---&gt;
    Serial Driver Support ---&gt;
        [*]   Enable standard &quot;upper-half&quot; serial driver
</code></pre><h2 id="network" tabindex="-1">Network <a class="header-anchor" href="#network" aria-label="Permalink to &quot;Network&quot;">​</a></h2><h3 id="how-to-detect-ethernet-cable-connection-disconnection" tabindex="-1">How to detect Ethernet cable connection/disconnection? <a class="header-anchor" href="#how-to-detect-ethernet-cable-connection-disconnection" aria-label="Permalink to &quot;How to detect Ethernet cable connection/disconnection?&quot;">​</a></h3><p>NuttX supports Ethernet connection/disconnection events from Ethernet PHY using signals (see <code>nuttx/drivers/net/phy_notify.c</code>). The network monitor thread at apps/netutils/netinit (see <code>CONFIG_NETINIT_MONITOR</code>) will handle taking the network down if the cable is unplugged and bringing it back up when the cable is restored. It is important to note that your Ethernet controller driver of your MCU needs to support CONFIG_ARCH_PHY_INTERRUPT (and implement <code>arch_phy_irq()</code>).</p><h3 id="how-to-define-the-mtu-and-mss-for-the-network-packets" tabindex="-1">How to define the MTU and MSS for the network packets? <a class="header-anchor" href="#how-to-define-the-mtu-and-mss-for-the-network-packets" aria-label="Permalink to &quot;How to define the MTU and MSS for the network packets?&quot;">​</a></h3><p>As you probably know the &quot;MSS = MTU - 40&quot;, so you just need to setup the MTU. If you search for MTU in the menuconfig you will not find it, but you can setup the MTU using the <code>CONFIG_NET_ETH_PKTSIZE</code> here:</p><pre><code>Networking Support  ---&gt;
    Driver buffer configuration  ---&gt;
        (590) Ethernet packet buffer size
</code></pre><p>Then just figure it out using this formula:</p><blockquote><p>MTU = NET_ETH_PKTSIZE - 14</p><p>MSS = MTU - 40</p></blockquote><p>In this case you have MTU = 590 - 14 =&gt; MTU = 576!</p><p>And the MSS = 576 - 40 =&gt; MSS = 536.</p>`,56)]))}const m=n(i,[["render",r]]);export{u as __pageData,m as default};
