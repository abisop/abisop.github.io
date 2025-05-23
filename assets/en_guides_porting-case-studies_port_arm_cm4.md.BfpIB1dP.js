import{_ as e,c as l,al as n,j as a,a as p,o as i}from"./chunks/framework.NFAqBSgQ.js";const b=JSON.parse('{"title":"The case of ARM CM4 & cxd32xx @NuttX12.4.0","description":"","frontmatter":{},"headers":[],"relativePath":"en/guides/porting-case-studies/port_arm_cm4.md","filePath":"en/guides/porting-case-studies/port_arm_cm4.md"}'),c={name:"en/guides/porting-case-studies/port_arm_cm4.md"};function t(o,s,d,r,u,h){return i(),l("div",null,s[0]||(s[0]=[n(`<h1 id="the-case-of-arm-cm4-cxd32xx-nuttx12-4-0" tabindex="-1">The case of ARM CM4 &amp; cxd32xx @NuttX12.4.0 <a class="header-anchor" href="#the-case-of-arm-cm4-cxd32xx-nuttx12-4-0" aria-label="Permalink to &quot;The case of ARM CM4 &amp; cxd32xx \\@NuttX12.4.0&quot;">​</a></h1><h2 id="step1-add-the-soc" tabindex="-1">Step1 : Add the SoC <a class="header-anchor" href="#step1-add-the-soc" aria-label="Permalink to &quot;Step1 : Add the SoC&quot;">​</a></h2><p>Create the SoC directory.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> touch arch/arm/include/cxd32xx</span></span>
<span class="line"><span> touch arch/arm/src/cxd32xx</span></span></code></pre></div><p>Modify &quot;arch/arm/Kconfig&quot; to register the SoC directory.</p><p>Add &quot;Kconfig&quot; and &quot;Make.defs&quot; for the SoC directory.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> touch arch/arm/src/cxd32xx/Kconfig</span></span>
<span class="line"><span> touch arch/arm/src/cxd32xx/Make.defs</span></span></code></pre></div><p>For details about these files, see <a href="https://github.com/apache/nuttx/pull/12441" target="_blank" rel="noreferrer">apache/nuttx/pull/12441</a></p><h2 id="step2-add-the-board" tabindex="-1">Step2 : Add the Board <a class="header-anchor" href="#step2-add-the-board" aria-label="Permalink to &quot;Step2 : Add the Board&quot;">​</a></h2><p>There are two ways about adding the Board directory. The one is in-of-tree, another one is out-of-tree. For details see [[/guide](]{.title-ref}/guide.md)s/customboards\`. And if you wanted to add own apps, see [[/guide](]{.title-ref}/guide.md)s/customapps\`.</p><p>This time, the way of out-of-tree is selected. The directory structure is following :</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apps/</span></span>
<span class="line"><span>nuttx/</span></span>
<span class="line"><span>out-of-tree/cxd32xx_boards</span></span></code></pre></div><p>Create the board : cb2sdb2 as the board of cxd32xx.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> touch out-of-tree/cxd32xx_boards/cb2sdb2/configs/nsh</span></span>
<span class="line"><span> touch out-of-tree/cxd32xx_boards/cb2sdb2/include</span></span>
<span class="line"><span> touch out-of-tree/cxd32xx_boards/cb2sdb2/scripts</span></span>
<span class="line"><span> touch out-of-tree/cxd32xx_boards/cb2sdb2/src</span></span></code></pre></div><p>Add &quot;Kconfig&quot;, &quot;defconfig&quot;, &quot;Make.defs&quot; and &quot;Makefile&quot;.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> touch out-of-tree/cxd32xx_boards/cb2sdb2/Kconfig</span></span>
<span class="line"><span> touch out-of-tree/cxd32xx_boards/cb2sdb2/configs/nsh/defconfig</span></span>
<span class="line"><span> touch out-of-tree/cxd32xx_boards/cb2sdb2/scripts/Make.defs</span></span>
<span class="line"><span> touch out-of-tree/cxd32xx_boards/cb2sdb2/src/Makefile</span></span></code></pre></div><p>For details about these files, see <code>out-of-tree</code>{.interpreted-text role=&quot;ref&quot;}.</p><h2 id="step3-configure" tabindex="-1">Step3 : Configure <a class="header-anchor" href="#step3-configure" aria-label="Permalink to &quot;Step3 : Configure&quot;">​</a></h2><p>Now you can do configure by following commands. It is important to confirm these commands are working.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> cd nuttx</span></span>
<span class="line"><span> ./tools/configure.sh -l ../out-of-tree/cxd32xx_boards/cb2sdb2/configs/nsh</span></span></code></pre></div><p>And you can do menuconfig by following command.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make menuconfig</span></span></code></pre></div><p>And you can do distclean by following command.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make distclean</span></span></code></pre></div><h2 id="step4-compile" tabindex="-1">Step4 : Compile <a class="header-anchor" href="#step4-compile" aria-label="Permalink to &quot;Step4 : Compile&quot;">​</a></h2><p>Try to build with the implementation of Step1-2, you would face the error as following if you implemented only directory / Kconfig / Make.defs / Makefile / defconfig about Step1-2.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make</span></span>
<span class="line"><span>Create version.h</span></span>
<span class="line"><span>LN: platform/board to /home/lassdk/workdir/nuttx1/apps/platform/dummy</span></span>
<span class="line"><span>In file included from /home/lassdk/workdir/nuttx1/nuttx/include/nuttx/irq.h:37:0,</span></span>
<span class="line"><span>                 from /home/lassdk/workdir/nuttx1/nuttx/include/nuttx/sched.h:40,</span></span>
<span class="line"><span>                 from /home/lassdk/workdir/nuttx1/nuttx/include/nuttx/arch.h:87,</span></span>
<span class="line"><span>                 from ./clock/clock_initialize.c:37:</span></span>
<span class="line"><span>/home/lassdk/workdir/nuttx1/nuttx/include/arch/irq.h:43:27: </span></span>
<span class="line"><span>fatal error: arch/chip/irq.h: No such file or directory</span></span>
<span class="line"><span>compilation terminated.</span></span>
<span class="line"><span>ERROR: arm-none-eabi-gcc failed: 1</span></span>
<span class="line"><span>       command: arm-none-eabi-gcc -MT ./clock_initialize.o  -M &#39;-Wstrict-prototypes&#39;</span></span>
<span class="line"><span>        &#39;-Wno-attributes&#39; &#39;-Wno-unknown-pragmas&#39; &#39;-Wno-psabi&#39; &#39;-Os&#39;</span></span>
<span class="line"><span>         &#39;-fno-strict-aliasing&#39; &#39;-fomit-frame-pointer&#39; &#39;-fno-common&#39; &#39;-Wall&#39;</span></span>
<span class="line"><span>         &#39;-Wshadow&#39; &#39;-Wundef&#39; </span></span>
<span class="line"><span>         &#39;-ffunction-sections&#39; &#39;-fdata-sections&#39; &#39;-mlittle-endian&#39; </span></span>
<span class="line"><span>         &#39;-march=armv7e-m&#39; &#39;-mtune=cortex-m4&#39; </span></span>
<span class="line"><span>          &#39;-mfpu=fpv4-sp-d16&#39; &#39;-mfloat-abi=hard&#39; &#39;-mthumb&#39; &#39;-Wa,-mthumb&#39; </span></span>
<span class="line"><span>          &#39;-Wa,-mimplicit-it=always&#39; &#39;-isystem&#39; </span></span>
<span class="line"><span>          &#39;/home/lassdk/workdir/nuttx1/nuttx/include&#39;</span></span>
<span class="line"><span>           &#39;-D__NuttX__&#39; &#39;-DNDEBUG&#39; &#39;-D__KERNEL__&#39; &#39;-pipe&#39; &#39;-I&#39; </span></span>
<span class="line"><span>           &#39;/home/lassdk/workdir/nuttx1/nuttx/sched&#39; ./clock/clock_initialize.c</span></span>
<span class="line"><span>make[2]: *** [/home/lassdk/workdir/nuttx1/nuttx/tools/Config.mk:230: </span></span>
<span class="line"><span>clock_initialize.ddc] Error 1</span></span>
<span class="line"><span>make[1]: *** [Makefile:71: .depend] Error 2</span></span>
<span class="line"><span>make: *** [tools/Unix.mk:619: pass2dep] Error 2</span></span></code></pre></div><p>Try to add &quot;irq.h&quot; with referring to cxd56xx and retry to build. This time, the build system will teach that you have to implement &quot;chip.h&quot; as following.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make</span></span>
<span class="line"><span>CC:  clock/clock_initialize.c In file included from</span></span>
<span class="line"><span> /home/lassdk/workdir/nuttx2/nuttx/include/arch/armv7-m/irq.h:37:0,</span></span>
<span class="line"><span>                 from /home/lassdk/workdir/nuttx2/nuttx/include/arch/irq.h:56,</span></span>
<span class="line"><span>                 from /home/lassdk/workdir/nuttx2/nuttx/include/nuttx/irq.h:37,</span></span>
<span class="line"><span>                 from /home/lassdk/workdir/nuttx2/nuttx/include/nuttx/sched.h:40,</span></span>
<span class="line"><span>                 from /home/lassdk/workdir/nuttx2/nuttx/include/nuttx/arch.h:87,</span></span>
<span class="line"><span>                 from clock/clock_initialize.c:37:</span></span>
<span class="line"><span>/home/lassdk/workdir/nuttx2/nuttx/include/arch/armv7-m/nvicpri.h:28:28</span></span>
<span class="line"><span> fatal error: arch/chip/chip.h: No such file or directory</span></span>
<span class="line"><span>compilation terminated.</span></span>
<span class="line"><span>make[1]: *** [Makefile:61: clock_initialize.o] Error 1</span></span>
<span class="line"><span>make: *** [tools/LibTargets.mk:65: sched/libsched.a] Error 2</span></span></code></pre></div><p>Continue this try and error until pass the Compiling.</p><h2 id="step5-link" tabindex="-1">Step5 : Link <a class="header-anchor" href="#step5-link" aria-label="Permalink to &quot;Step5 : Link&quot;">​</a></h2><p>After the pass of Compiling, you will get following error. To resolve this error, you have to implement the linker script.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make</span></span>
<span class="line"><span>make[1]: *** No rule to make target </span></span>
<span class="line"><span>&#39;/home/lassdk/workdir/nuttx1/nuttx/../cxd32xx_boards/cb2sdb2/scripts/cb2sdb2.ld&#39;, </span></span>
<span class="line"><span>needed by &#39;/home/lassdk/workdir/nuttx1/nuttx/../cxd32xx_boards/cb2sdb2/scripts/cb2sdb2.ld.tmp&#39;.</span></span>
<span class="line"><span>  Stop.</span></span>
<span class="line"><span>make: *** [tools/Unix.mk:545: nuttx] Error 2</span></span></code></pre></div>`,33),a("p",null,[p("Try to add the linker script with referring to some board(cxd56xx, lpc43xx, etc) or "),a("code",{class:"interpreted-text",role:"ref"},"out-of-tree"),p(" and retry to build, the build system will teach that you have to implement some symbols as following.")],-1),n(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make</span></span>
<span class="line"><span>CPP:  /home/lassdk/workdir/nuttx1/nuttx/../cxd32xx_boards/cb2sdb2/scripts/cb2sdb2.ld-&gt;</span></span>
<span class="line"><span> /home/lassdk/workdir/nuttx1/nuttx/../boarLD: nuttx</span></span>
<span class="line"><span>arm-none-eabi-ld: warning: cannot find entry symbol __start; defaulting to 24011000</span></span>
<span class="line"><span>/home/lassdk/workdir/nuttx1/nuttx/staging/libarch.a(arm_vectors.o):(.vectors+0x4): </span></span>
<span class="line"><span>undefined reference to \`__start&#39;</span></span>
<span class="line"><span>/home/lassdk/workdir/nuttx1/nuttx/staging/libarch.a(arm_doirq.o): In function \`arm_doirq&#39;:</span></span>
<span class="line"><span>arm_doirq.c:(.text.arm_doirq+0x12): undefined reference to \`arm_ack_irq&#39;</span></span>
<span class="line"><span>/home/lassdk/workdir/nuttx1/nuttx/staging/libdrivers.a(syslog_channel.o): </span></span>
<span class="line"><span>In function \`syslog_default_putc&#39;:</span></span>
<span class="line"><span>syslog_channel.c:(.text.syslog_default_putc+0x2): undefined reference to \`up_putc&#39;</span></span>
<span class="line"><span>/home/lassdk/workdir/nuttx1/nuttx/staging/libarch.a(arm_nputs.o): In function \`up_nputs&#39;:</span></span>
<span class="line"><span>arm_nputs.c:(.text.up_nputs+0x10): undefined reference to \`up_putc&#39;</span></span>
<span class="line"><span>make[1]: *** [Makefile:197: nuttx] Error 1</span></span>
<span class="line"><span>make: *** [tools/Unix.mk:545: nuttx] Error 2</span></span></code></pre></div><h2 id="step6-implement" tabindex="-1">Step6 : Implement <a class="header-anchor" href="#step6-implement" aria-label="Permalink to &quot;Step6 : Implement&quot;">​</a></h2><p>There are some implementation items, major items are below listed. To pass the Linking, try to implement these symbols.</p><p>+-----------------+------------------------+--------------------------------------------------------------------+ | Category | Item | Comment | +-----------------+------------------------+--------------------------------------------------------------------+ | SoC directory | entory point : __start | <a href="https://github.com/apache/nuttx/pull/12441" target="_blank" rel="noreferrer">apache/nuttx/pull/12441</a> |</p><ul><li>+------------------------+ + | | Serial Driver | | + +------------------------+ + | | IDLE task stack | | + +------------------------+ + | | INTC | | + +------------------------+ + | | Timer | | +-----------------+------------------------+------------------------------------------------+-------------------+ | Board directory | board_app_initialize | [[/application](]{.title-ref}/application.md)s/nsh/customizing\` + +------------------------+------------------------------------------------+ | | <a href="https://github.com/apache/nuttx/blob/master/sched/Kconfig" target="_blank" rel="noreferrer">sched/Kconfig</a> :<a href="./.html">BOARD</a>&lt;EARLY/LATE&gt;_INITIALIZE| | +-----------------+------------------------+------------------------------------------------+-------------------+</li></ul><p>If got the pass of Linking, you would see following result.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make</span></span>
<span class="line"><span>Create version.h</span></span>
<span class="line"><span>LN: platform/board to /home/lassdk/workdir/nuttx2/apps/platform/dummy</span></span>
<span class="line"><span>Register: nsh</span></span>
<span class="line"><span>Register: sh</span></span>
<span class="line"><span>CPP:  /home/lassdk/workdir/nuttx2/nuttx/../boards/cb2sdb2/scripts/cb2sdb2.ld-&gt;</span></span>
<span class="line"><span> /home/lassdk/workdir/nuttx2/nuttx/../boarLD: nuttx</span></span></code></pre></div><h2 id="step7-verify" tabindex="-1">Step7 : Verify <a class="header-anchor" href="#step7-verify" aria-label="Permalink to &quot;Step7 : Verify&quot;">​</a></h2><p>To execute and debug on the evaluation board, add following configurations.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CONFIG_RAW_BINARY=y</span></span>
<span class="line"><span>CONFIG_DEBUG_SYMBOLS=y</span></span></code></pre></div><p>If your implementations were good, you would see following logs.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>NuttShell (NSH) NuttX-12.4.0</span></span>
<span class="line"><span>nsh&gt;</span></span>
<span class="line"><span>nsh&gt;</span></span>
<span class="line"><span>nsh&gt;</span></span></code></pre></div><p>After confirming to boot NuttShell(NSH), try to execute &quot;apps/testing/ostest&quot;. The &quot;apps/testing/ostest&quot; needs following configurations.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CONFIG_BUILTIN=y</span></span>
<span class="line"><span>CONFIG_NSH_BUILTIN_APPS=y</span></span>
<span class="line"><span>CONFIG_SCHED_WAITPID=y</span></span>
<span class="line"><span>CONFIG_TESTING_OSTEST=y</span></span></code></pre></div><p>And one more test is recommended to check the timer implementation whether the kernel could count the time accurately or not. I checked it by following code. About the function : cxd32_timerget(), see <a href="https://github.com/apache/nuttx/pull/12441" target="_blank" rel="noreferrer">apache/nuttx/pull/12441</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>extern uint32_t cxd32_timerget(void);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    uint32_t pre;</span></span>
<span class="line"><span>    uint32_t post;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    pre = cxd32_timerget();</span></span>
<span class="line"><span>    sleep(1);</span></span>
<span class="line"><span>    post = cxd32_timerget();</span></span>
<span class="line"><span>    printf(&quot;pre:%lu post:%lu expect:1sec\\n&quot;, pre, post);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    pre = cxd32_timerget();</span></span>
<span class="line"><span>    sleep(10);</span></span>
<span class="line"><span>    post = cxd32_timerget();</span></span>
<span class="line"><span>    printf(&quot;pre:%lu post:%lu expect:10sec\\n&quot;, pre, post);</span></span>
<span class="line"><span>  }</span></span></code></pre></div><h2 id="appendix-out-of-tree-code" tabindex="-1">Appendix : out-of-tree code <a class="header-anchor" href="#appendix-out-of-tree-code" aria-label="Permalink to &quot;Appendix : out-of-tree code&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>diff --git a/cxd32xx_apps/Make.defs b/cxd32xx_apps/Make.defs</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..2d6b86e</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_apps/Make.defs</span></span>
<span class="line"><span>@@ -0,0 +1 @@</span></span>
<span class="line"><span>+include (wildcard (APPDIR)/cxd32xx_apps/*/Make.defs)</span></span>
<span class="line"><span>diff --git a/cxd32xx_apps/Makefile b/cxd32xx_apps/Makefile</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..e451b29</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_apps/Makefile</span></span>
<span class="line"><span>@@ -0,0 +1,3 @@</span></span>
<span class="line"><span>+MENUDESC = &quot;cxd32xx_apps&quot;</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+include (APPDIR)/Directory.mk</span></span>
<span class="line"><span>diff --git a/cxd32xx_apps/hello/Kconfig b/cxd32xx_apps/hello/Kconfig</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..7f0b41e</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_apps/hello/Kconfig</span></span>
<span class="line"><span>@@ -0,0 +1,29 @@</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+# For a description of the syntax of this configuration file,</span></span>
<span class="line"><span>+# see the file kconfig-language.txt in the NuttX tools repository.</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+config CXD32XX_APPS_HELLO</span></span>
<span class="line"><span>+    tristate &quot;CXD32XX Hello App&quot;</span></span>
<span class="line"><span>+    default n</span></span>
<span class="line"><span>+    ---help---</span></span>
<span class="line"><span>+        Enable the CXD32XX Hello App</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+if CXD32XX_APPS_HELLO</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+config CXD32XX_APPS_HELLO_PROGNAME</span></span>
<span class="line"><span>+    string &quot;Program name&quot;</span></span>
<span class="line"><span>+    default &quot;hello&quot;</span></span>
<span class="line"><span>+    ---help---</span></span>
<span class="line"><span>+        This is the name of the program that will be used when the NSH ELF</span></span>
<span class="line"><span>+        program is installed.</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+config CXD32XX_APPS_HELLO_PRIORITY</span></span>
<span class="line"><span>+    int &quot;CXD32XX Hello task priority&quot;</span></span>
<span class="line"><span>+    default 100</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+config CXD32XX_APPS_HELLO_STACKSIZE</span></span>
<span class="line"><span>+    int &quot;CXD32XX Hello stack size&quot;</span></span>
<span class="line"><span>+    default DEFAULT_TASK_STACKSIZE</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+endif</span></span>
<span class="line"><span>diff --git a/cxd32xx_apps/hello/Make.defs b/cxd32xx_apps/hello/Make.defs</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..730329a</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_apps/hello/Make.defs</span></span>
<span class="line"><span>@@ -0,0 +1,3 @@</span></span>
<span class="line"><span>+ifneq ((CONFIG_CXD32XX_APPS_HELLO),)</span></span>
<span class="line"><span>+CONFIGURED_APPS += (APPDIR)/cxd32xx_apps/hello</span></span>
<span class="line"><span>+endif</span></span>
<span class="line"><span>diff --git a/cxd32xx_apps/hello/Makefile b/cxd32xx_apps/hello/Makefile</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..b3438e1</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_apps/hello/Makefile</span></span>
<span class="line"><span>@@ -0,0 +1,14 @@</span></span>
<span class="line"><span>+include (APPDIR)/Make.defs</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+# Custom Hello built-in application info</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+PROGNAME = (CONFIG_CXD32XX_APPS_HELLO_PROGNAME)</span></span>
<span class="line"><span>+PRIORITY = (CONFIG_CXD32XX_APPS_HELLO_PRIORITY)</span></span>
<span class="line"><span>+STACKSIZE = (CONFIG_CXD32XX_APPS_HELLO_STACKSIZE)</span></span>
<span class="line"><span>+MODULE = (CONFIG_CXD32XX_APPS_HELLO)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+# Custom Hello</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+MAINSRC = hello.c</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+include (APPDIR)/Application.mk</span></span>
<span class="line"><span>diff --git a/cxd32xx_apps/hello/hello.c b/cxd32xx_apps/hello/hello.c</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..b14a762</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_apps/hello/hello.c</span></span>
<span class="line"><span>@@ -0,0 +1,24 @@</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * cxd32xx_apps/hello/hello.c</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Included Files</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+#include &lt;nuttx/config.h&gt;</span></span>
<span class="line"><span>+#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Public Functions</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * hello_main</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+int main(int argc, FAR char *argv[])</span></span>
<span class="line"><span>+{</span></span>
<span class="line"><span>+  printf(&quot;Hello, World!!\\n&quot;);</span></span>
<span class="line"><span>+  return 0;</span></span>
<span class="line"><span>+}</span></span>
<span class="line"><span>diff --git a/cxd32xx_apps/time/Kconfig b/cxd32xx_apps/time/Kconfig</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..64e7591</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_apps/time/Kconfig</span></span>
<span class="line"><span>@@ -0,0 +1,28 @@</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+# For a description of the syntax of this configuration file,</span></span>
<span class="line"><span>+# see the file kconfig-language.txt in the NuttX tools repository.</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+config CXD32XX_APPS_TIME</span></span>
<span class="line"><span>+    tristate &quot;CXD32XX Time App&quot;</span></span>
<span class="line"><span>+    default n</span></span>
<span class="line"><span>+    ---help---</span></span>
<span class="line"><span>+        Enable the CXD32XX Time App</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+if CXD32XX_APPS_HELLO</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+config CXD32XX_APPS_TIME_PROGNAME</span></span>
<span class="line"><span>+    string &quot;Program name&quot;</span></span>
<span class="line"><span>+    default &quot;time&quot;</span></span>
<span class="line"><span>+    ---help---</span></span>
<span class="line"><span>+        This apps measures the elapsed time of sleep system call to confirm the timer implementation.</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+config CXD32XX_APPS_TIME_PRIORITY</span></span>
<span class="line"><span>+    int &quot;CXD32XX Time task priority&quot;</span></span>
<span class="line"><span>+    default 100</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+config CXD32XX_APPS_TIME_STACKSIZE</span></span>
<span class="line"><span>+    int &quot;CXD32XX Time stack size&quot;</span></span>
<span class="line"><span>+    default DEFAULT_TASK_STACKSIZE</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+endif</span></span>
<span class="line"><span>diff --git a/cxd32xx_apps/time/Make.defs b/cxd32xx_apps/time/Make.defs</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..cdfb4cc</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_apps/time/Make.defs</span></span>
<span class="line"><span>@@ -0,0 +1,3 @@</span></span>
<span class="line"><span>+ifneq ((CONFIG_CXD32XX_APPS_TIME),)</span></span>
<span class="line"><span>+CONFIGURED_APPS += (APPDIR)/cxd32xx_apps/time</span></span>
<span class="line"><span>+endif</span></span>
<span class="line"><span>diff --git a/cxd32xx_apps/time/Makefile b/cxd32xx_apps/time/Makefile</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..94c9007</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_apps/time/Makefile</span></span>
<span class="line"><span>@@ -0,0 +1,14 @@</span></span>
<span class="line"><span>+include (APPDIR)/Make.defs</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+# Custom Hello built-in application info</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+PROGNAME = (CONFIG_CXD32XX_APPS_TIME_PROGNAME)</span></span>
<span class="line"><span>+PRIORITY = (CONFIG_CXD32XX_APPS_TIME_PRIORITY)</span></span>
<span class="line"><span>+STACKSIZE = (CONFIG_CXD32XX_APPS_TIME_STACKSIZE)</span></span>
<span class="line"><span>+MODULE = (CONFIG_CXD32XX_APPS_TIME)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+# Custom Hello</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+MAINSRC = time.c</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+include (APPDIR)/Application.mk</span></span>
<span class="line"><span>diff --git a/cxd32xx_apps/time/time.c b/cxd32xx_apps/time/time.c</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..9775ef2</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_apps/time/time.c</span></span>
<span class="line"><span>@@ -0,0 +1,41 @@</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * cxd32xx_apps/time/time.c</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Included Files</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+#include &lt;nuttx/config.h&gt;</span></span>
<span class="line"><span>+#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Public Functions</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+extern uint32_t cxd32_timerget(void);</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * hello_main</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+int main(int argc, FAR char *argv[])</span></span>
<span class="line"><span>+{</span></span>
<span class="line"><span>+  uint32_t pre;</span></span>
<span class="line"><span>+  uint32_t post;</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+  printf(&quot;measures the elapsed time of sleep system call to confirm \\</span></span>
<span class="line"><span>+  the timer implementation.\\n&quot;);</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+  pre = cxd32_timerget();</span></span>
<span class="line"><span>+  sleep(1);</span></span>
<span class="line"><span>+  post = cxd32_timerget();</span></span>
<span class="line"><span>+  printf(&quot;pre:%lu post:%lu expect:1sec\\n&quot;, pre, post);</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+  pre = cxd32_timerget();</span></span>
<span class="line"><span>+  sleep(10);</span></span>
<span class="line"><span>+  post = cxd32_timerget();</span></span>
<span class="line"><span>+  printf(&quot;pre:%lu post:%lu expect:10sec\\n&quot;, pre, post);</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+  return 0;</span></span>
<span class="line"><span>+}</span></span>
<span class="line"><span>diff --git a/cxd32xx_boards/cb2sdb2/Kconfig b/cxd32xx_boards/cb2sdb2/Kconfig</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..f72f3c0</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_boards/cb2sdb2/Kconfig</span></span>
<span class="line"><span>@@ -0,0 +1,4 @@</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+# For a description of the syntax of this configuration file,</span></span>
<span class="line"><span>+# see the file kconfig-language.txt in the NuttX tools repository.</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>diff --git a/cxd32xx_boards/cb2sdb2/configs/nsh/defconfig b/cxd32xx_boards/cb2sdb2/configs/nsh/defconfig</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..1d4c3e2</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_boards/cb2sdb2/configs/nsh/defconfig</span></span>
<span class="line"><span>@@ -0,0 +1,38 @@</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+# This file is autogenerated: PLEASE DO NOT EDIT IT.</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+# You can use &quot;make menuconfig&quot; to make any modifications to the installed .config file.</span></span>
<span class="line"><span>+# You can then do &quot;make savedefconfig&quot; to generate a new defconfig file that includes your</span></span>
<span class="line"><span>+# modifications.</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+CONFIG_ARCH=&quot;arm&quot;</span></span>
<span class="line"><span>+CONFIG_ARCH_CORTEXM4=y</span></span>
<span class="line"><span>+CONFIG_ARCH_FPU=y</span></span>
<span class="line"><span>+CONFIG_ARCH_CHIP=&quot;cxd32xx&quot;</span></span>
<span class="line"><span>+CONFIG_ARCH_CHIP_CXD32XX=y</span></span>
<span class="line"><span>+CONFIG_ARCH_BOARD_CUSTOM=y</span></span>
<span class="line"><span>+CONFIG_ARCH_BOARD_CUSTOM_DIR=&quot;../out-of-tree/cxd32xx_boards/cb2sdb2&quot;</span></span>
<span class="line"><span>+CONFIG_ARCH_BOARD_CUSTOM_DIR_RELPATH=y</span></span>
<span class="line"><span>+CONFIG_ARCH_BOARD_CUSTOM_NAME=&quot;cb2sdb2&quot;</span></span>
<span class="line"><span>+CONFIG_INIT_ENTRYPOINT=&quot;nsh_main&quot;</span></span>
<span class="line"><span>+CONFIG_UART0_SERIAL_CONSOLE=y</span></span>
<span class="line"><span>+CONFIG_SYSTEM_NSH=y</span></span>
<span class="line"><span>+CONFIG_RAM_START=0x00800000</span></span>
<span class="line"><span>+CONFIG_RAM_SIZE=244736</span></span>
<span class="line"><span>+CONFIG_ARCH_RAMVECTORS=y</span></span>
<span class="line"><span>+CONFIG_RAW_BINARY=y</span></span>
<span class="line"><span>+CONFIG_DEBUG_SYMBOLS=y</span></span>
<span class="line"><span>+CONFIG_UART_PL011=y</span></span>
<span class="line"><span>+CONFIG_UART0_PL011=y</span></span>
<span class="line"><span>+CONFIG_UART0_BASE=0x42104000</span></span>
<span class="line"><span>+CONFIG_UART0_IRQ=89</span></span>
<span class="line"><span>+CONFIG_UART0_CLK_FREQ=32000000</span></span>
<span class="line"><span>+CONFIG_UART_PL011_PLATFORMIF=y</span></span>
<span class="line"><span>+CONFIG_BUILTIN=y</span></span>
<span class="line"><span>+CONFIG_NSH_BUILTIN_APPS=y</span></span>
<span class="line"><span>+CONFIG_SCHED_WAITPID=y</span></span>
<span class="line"><span>+CONFIG_TESTING_OSTEST=y</span></span>
<span class="line"><span>+CONFIG_FS_PROCFS=y</span></span>
<span class="line"><span>+CONFIG_STACK_COLORATION=y</span></span>
<span class="line"><span>+CONFIG_CXD32XX_APPS_HELLO=y</span></span>
<span class="line"><span>+CONFIG_CXD32XX_APPS_TIME=y</span></span>
<span class="line"><span>diff --git a/cxd32xx_boards/cb2sdb2/include/board.h b/cxd32xx_boards/cb2sdb2/include/board.h</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..eae687e</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_boards/cb2sdb2/include/board.h</span></span>
<span class="line"><span>@@ -0,0 +1,54 @@</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * cxd32xx_boards/cb2sdb2/include/board.h</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ * Licensed to the Apache Software Foundation (ASF) under one or more</span></span>
<span class="line"><span>+ * contributor license agreements.  See the NOTICE file distributed with</span></span>
<span class="line"><span>+ * this work for additional information regarding copyright ownership.  The</span></span>
<span class="line"><span>+ * ASF licenses this file to you under the Apache License, Version 2.0 (the</span></span>
<span class="line"><span>+ * &quot;License&quot;); you may not use this file except in compliance with the</span></span>
<span class="line"><span>+ * License.  You may obtain a copy of the License at</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ *   http://www.apache.org/licenses/LICENSE-2.0</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ * Unless required by applicable law or agreed to in writing, software</span></span>
<span class="line"><span>+ * distributed under the License is distributed on an &quot;AS IS&quot; BASIS, WITHOUT</span></span>
<span class="line"><span>+ * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the</span></span>
<span class="line"><span>+ * License for the specific language governing permissions and limitations</span></span>
<span class="line"><span>+ * under the License.</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+#ifndef __CXD32XX_BOARDS_CB2SDB2_INCLUDE_BOARD_H</span></span>
<span class="line"><span>+#define __CXD32XX_BOARDS_CB2SDB2_INCLUDE_BOARD_H</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Included Files</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+#include &lt;nuttx/config.h&gt;</span></span>
<span class="line"><span>+#include &lt;nuttx/irq.h&gt;</span></span>
<span class="line"><span>+#include &lt;sys/boardctl.h&gt;</span></span>
<span class="line"><span>+#include &lt;stdbool.h&gt;</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Pre-processor Definitions</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Public Types</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Public Function Prototypes</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Name: cxd32_boardinitialize</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ * Description:</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+void cxd32_boardinitialize(void);</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+#endif /* __CXD32XX_BOARDS_CB2SDB2_INCLUDE_BOARD_H */</span></span>
<span class="line"><span>diff --git a/cxd32xx_boards/cb2sdb2/scripts/Make.defs b/cxd32xx_boards/cb2sdb2/scripts/Make.defs</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..4986d69</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_boards/cb2sdb2/scripts/Make.defs</span></span>
<span class="line"><span>@@ -0,0 +1,40 @@</span></span>
<span class="line"><span>+############################################################################</span></span>
<span class="line"><span>+# cxd32xx_boards/cb2sdb2/scripts/Make.defs</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+# Licensed to the Apache Software Foundation (ASF) under one or more</span></span>
<span class="line"><span>+# contributor license agreements.  See the NOTICE file distributed with</span></span>
<span class="line"><span>+# this work for additional information regarding copyright ownership.  The</span></span>
<span class="line"><span>+# ASF licenses this file to you under the Apache License, Version 2.0 (the</span></span>
<span class="line"><span>+# &quot;License&quot;); you may not use this file except in compliance with the</span></span>
<span class="line"><span>+# License.  You may obtain a copy of the License at</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+#   http://www.apache.org/licenses/LICENSE-2.0</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+# Unless required by applicable law or agreed to in writing, software</span></span>
<span class="line"><span>+# distributed under the License is distributed on an &quot;AS IS&quot; BASIS, WITHOUT</span></span>
<span class="line"><span>+# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the</span></span>
<span class="line"><span>+# License for the specific language governing permissions and limitations</span></span>
<span class="line"><span>+# under the License.</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+############################################################################</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+include (TOPDIR)/.config</span></span>
<span class="line"><span>+include (TOPDIR)/tools/Config.mk</span></span>
<span class="line"><span>+include (TOPDIR)/arch/arm/src/armv7-m/Toolchain.defs</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+LDSCRIPT = cb2sdb2.ld</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+ARCHSCRIPT += (BOARD_DIR)(DELIM)scripts(DELIM)(LDSCRIPT)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+ARCHPICFLAGS = -fpic -msingle-pic-base -mpic-register=r10</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+CFLAGS := (ARCHCFLAGS) (ARCHOPTIMIZATION) (ARCHCPUFLAGS) (ARCHINCLUDES) (ARCHDEFINES) (EXTRAFLAGS) -pipe</span></span>
<span class="line"><span>+CPICFLAGS = (ARCHPICFLAGS) (CFLAGS)</span></span>
<span class="line"><span>+CXXFLAGS := (ARCHCXXFLAGS) (ARCHOPTIMIZATION) (ARCHCPUFLAGS) (ARCHXXINCLUDES) (ARCHDEFINES) (EXTRAFLAGS) -pipe</span></span>
<span class="line"><span>+CXXPICFLAGS = (ARCHPICFLAGS) (CXXFLAGS)</span></span>
<span class="line"><span>+CPPFLAGS := (ARCHINCLUDES) (ARCHDEFINES) (EXTRAFLAGS)</span></span>
<span class="line"><span>+AFLAGS := (CFLAGS) -D__ASSEMBLY__</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+NXFLATLDFLAGS1 = -r -d -warn-common</span></span>
<span class="line"><span>+NXFLATLDFLAGS2 = (NXFLATLDFLAGS1) -T(TOPDIR)/binfmt/libnxflat/gnu-nxflat-pcrel.ld -no-check-sections</span></span>
<span class="line"><span>+LDNXFLATFLAGS = -e main -s 2048</span></span>
<span class="line"><span>diff --git a/cxd32xx_boards/cb2sdb2/scripts/cb2sdb2.ld b/cxd32xx_boards/cb2sdb2/scripts/cb2sdb2.ld</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..34ac8ac</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_boards/cb2sdb2/scripts/cb2sdb2.ld</span></span>
<span class="line"><span>@@ -0,0 +1,99 @@</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * cxd32xx_boards/cb2sdb2/scripts/cb2sdb2.ld</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ * Licensed to the Apache Software Foundation (ASF) under one or more</span></span>
<span class="line"><span>+ * contributor license agreements.  See the NOTICE file distributed with</span></span>
<span class="line"><span>+ * this work for additional information regarding copyright ownership.  The</span></span>
<span class="line"><span>+ * ASF licenses this file to you under the Apache License, Version 2.0 (the</span></span>
<span class="line"><span>+ * &quot;License&quot;); you may not use this file except in compliance with the</span></span>
<span class="line"><span>+ * License.  You may obtain a copy of the License at</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ *   http://www.apache.org/licenses/LICENSE-2.0</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ * Unless required by applicable law or agreed to in writing, software</span></span>
<span class="line"><span>+ * distributed under the License is distributed on an &quot;AS IS&quot; BASIS, WITHOUT</span></span>
<span class="line"><span>+ * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the</span></span>
<span class="line"><span>+ * License for the specific language governing permissions and limitations</span></span>
<span class="line"><span>+ * under the License.</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+INCLUDE ../../../../out-of-tree/cxd32xx_boards/cb2sdb2/scripts/memmap.ld</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+OUTPUT_ARCH(arm)</span></span>
<span class="line"><span>+ENTRY(__start)         /* Treat __start as the anchor for dead code stripping */</span></span>
<span class="line"><span>+EXTERN(_vectors)       /* Force the vectors to be included in the output */</span></span>
<span class="line"><span>+SECTIONS</span></span>
<span class="line"><span>+{</span></span>
<span class="line"><span>+    .text : {</span></span>
<span class="line"><span>+        _stext = ABSOLUTE(.);</span></span>
<span class="line"><span>+        *(.entry)</span></span>
<span class="line"><span>+        *(.vectors)</span></span>
<span class="line"><span>+        *(.text .text.*)</span></span>
<span class="line"><span>+        *(.fixup)</span></span>
<span class="line"><span>+        *(.gnu.warning)</span></span>
<span class="line"><span>+        *(.rodata .rodata.*)</span></span>
<span class="line"><span>+        *(.gnu.linkonce.t.*)</span></span>
<span class="line"><span>+        *(.glue_7)</span></span>
<span class="line"><span>+        *(.glue_7t)</span></span>
<span class="line"><span>+        *(.got)</span></span>
<span class="line"><span>+        *(.gcc_except_table)</span></span>
<span class="line"><span>+        *(.gnu.linkonce.r.*)</span></span>
<span class="line"><span>+        _etext = ABSOLUTE(.);</span></span>
<span class="line"><span>+    } &gt; flash_Cached</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+    .init_section : {</span></span>
<span class="line"><span>+        _sinit = ABSOLUTE(.);</span></span>
<span class="line"><span>+        KEEP(*(SORT_BY_INIT_PRIORITY(.init_array.*) SORT_BY_INIT_PRIORITY(.ctors.*)))</span></span>
<span class="line"><span>+        KEEP(*(.init_array .ctors))</span></span>
<span class="line"><span>+        _einit = ABSOLUTE(.);</span></span>
<span class="line"><span>+    } &gt; flash_Cached</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+    .ARM.extab : {</span></span>
<span class="line"><span>+        *(.ARM.extab*)</span></span>
<span class="line"><span>+    } &gt; flash_Cached</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+    __exidx_start = ABSOLUTE(.);</span></span>
<span class="line"><span>+    .ARM.exidx : {</span></span>
<span class="line"><span>+        *(.ARM.exidx*)</span></span>
<span class="line"><span>+    } &gt; flash_Cached</span></span>
<span class="line"><span>+    __exidx_end = ABSOLUTE(.);</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+    _eronly = ABSOLUTE(.);</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+    .data : {</span></span>
<span class="line"><span>+        _sdata = ABSOLUTE(.);</span></span>
<span class="line"><span>+        *(.data .data.*)</span></span>
<span class="line"><span>+        *(.gnu.linkonce.d.*)</span></span>
<span class="line"><span>+        CONSTRUCTORS</span></span>
<span class="line"><span>+        . = ALIGN(4);</span></span>
<span class="line"><span>+        _edata = ABSOLUTE(.);</span></span>
<span class="line"><span>+    } &gt; sram AT &gt; flash_Cached</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+    .ram_vectors : {</span></span>
<span class="line"><span>+        *(.ram_vectors)</span></span>
<span class="line"><span>+    } &gt; sram</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+    .bss : {            /* BSS              */</span></span>
<span class="line"><span>+        _sbss = ABSOLUTE(.);</span></span>
<span class="line"><span>+        *(.bss .bss.*)</span></span>
<span class="line"><span>+        *(.gnu.linkonce.b.*)</span></span>
<span class="line"><span>+        *(COMMON)</span></span>
<span class="line"><span>+        . = ALIGN(4);</span></span>
<span class="line"><span>+        _ebss = ABSOLUTE(.);</span></span>
<span class="line"><span>+    } &gt; sram</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+    /* Stabs debugging sections.    */</span></span>
<span class="line"><span>+    .stab 0 : { *(.stab) }</span></span>
<span class="line"><span>+    .stabstr 0 : { *(.stabstr) }</span></span>
<span class="line"><span>+    .stab.excl 0 : { *(.stab.excl) }</span></span>
<span class="line"><span>+    .stab.exclstr 0 : { *(.stab.exclstr) }</span></span>
<span class="line"><span>+    .stab.index 0 : { *(.stab.index) }</span></span>
<span class="line"><span>+    .stab.indexstr 0 : { *(.stab.indexstr) }</span></span>
<span class="line"><span>+    .comment 0 : { *(.comment) }</span></span>
<span class="line"><span>+    .debug_abbrev 0 : { *(.debug_abbrev) }</span></span>
<span class="line"><span>+    .debug_info 0 : { *(.debug_info) }</span></span>
<span class="line"><span>+    .debug_line 0 : { *(.debug_line) }</span></span>
<span class="line"><span>+    .debug_pubnames 0 : { *(.debug_pubnames) }</span></span>
<span class="line"><span>+    .debug_aranges 0 : { *(.debug_aranges) }</span></span>
<span class="line"><span>+}</span></span>
<span class="line"><span>diff --git a/cxd32xx_boards/cb2sdb2/scripts/memmap.ld b/cxd32xx_boards/cb2sdb2/scripts/memmap.ld</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..848f336</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_boards/cb2sdb2/scripts/memmap.ld</span></span>
<span class="line"><span>@@ -0,0 +1,13 @@</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Automatically generated file; DO NOT EDIT.</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+MEMORY</span></span>
<span class="line"><span>+{</span></span>
<span class="line"><span>+  sram              (rwx) : ORIGIN = 0x00800000, LENGTH = 0x0003BC00</span></span>
<span class="line"><span>+  sram_erw          (rw)  : ORIGIN = 0x0083BC00, LENGTH = 0x00001000</span></span>
<span class="line"><span>+  sram_frw          (rw)  : ORIGIN = 0x0083CC00, LENGTH = 0x00002000</span></span>
<span class="line"><span>+  sram_prt          (rw)  : ORIGIN = 0x0083EC00, LENGTH = 0x00001000</span></span>
<span class="line"><span>+  sram_lib          (rwx) : ORIGIN = 0x0083FC00, LENGTH = 0x00000400</span></span>
<span class="line"><span>+  flash_Cached      (rx)  : ORIGIN = 0x24010000, LENGTH = 0x0013F000</span></span>
<span class="line"><span>+}</span></span>
<span class="line"><span>diff --git a/cxd32xx_boards/cb2sdb2/src/Makefile b/cxd32xx_boards/cb2sdb2/src/Makefile</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..f8b1cd8</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_boards/cb2sdb2/src/Makefile</span></span>
<span class="line"><span>@@ -0,0 +1,25 @@</span></span>
<span class="line"><span>+############################################################################</span></span>
<span class="line"><span>+# cxd32xx_boards/cb2sdb2/src/Makefile</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+# Licensed to the Apache Software Foundation (ASF) under one or more</span></span>
<span class="line"><span>+# contributor license agreements.  See the NOTICE file distributed with</span></span>
<span class="line"><span>+# this work for additional information regarding copyright ownership.  The</span></span>
<span class="line"><span>+# ASF licenses this file to you under the Apache License, Version 2.0 (the</span></span>
<span class="line"><span>+# &quot;License&quot;); you may not use this file except in compliance with the</span></span>
<span class="line"><span>+# License.  You may obtain a copy of the License at</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+#   http://www.apache.org/licenses/LICENSE-2.0</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+# Unless required by applicable law or agreed to in writing, software</span></span>
<span class="line"><span>+# distributed under the License is distributed on an &quot;AS IS&quot; BASIS, WITHOUT</span></span>
<span class="line"><span>+# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the</span></span>
<span class="line"><span>+# License for the specific language governing permissions and limitations</span></span>
<span class="line"><span>+# under the License.</span></span>
<span class="line"><span>+#</span></span>
<span class="line"><span>+############################################################################</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+include (TOPDIR)/Make.defs</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+CSRCS += cxd32_appinit.c cxd32_boot.c</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+include (TOPDIR)/boards/Board.mk</span></span>
<span class="line"><span>diff --git a/cxd32xx_boards/cb2sdb2/src/cxd32_appinit.c b/cxd32xx_boards/cb2sdb2/src/cxd32_appinit.c</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..c1bef5f</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_boards/cb2sdb2/src/cxd32_appinit.c</span></span>
<span class="line"><span>@@ -0,0 +1,90 @@</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * cxd32xx_boards/cb2sdb2/src/cxd32_appinit.c</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ * Licensed to the Apache Software Foundation (ASF) under one or more</span></span>
<span class="line"><span>+ * contributor license agreements.  See the NOTICE file distributed with</span></span>
<span class="line"><span>+ * this work for additional information regarding copyright ownership.  The</span></span>
<span class="line"><span>+ * ASF licenses this file to you under the Apache License, Version 2.0 (the</span></span>
<span class="line"><span>+ * &quot;License&quot;); you may not use this file except in compliance with the</span></span>
<span class="line"><span>+ * License.  You may obtain a copy of the License at</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ *   http://www.apache.org/licenses/LICENSE-2.0</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ * Unless required by applicable law or agreed to in writing, software</span></span>
<span class="line"><span>+ * distributed under the License is distributed on an &quot;AS IS&quot; BASIS, WITHOUT</span></span>
<span class="line"><span>+ * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the</span></span>
<span class="line"><span>+ * License for the specific language governing permissions and limitations</span></span>
<span class="line"><span>+ * under the License.</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Included Files</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+#include &lt;nuttx/config.h&gt;</span></span>
<span class="line"><span>+#include &lt;nuttx/compiler.h&gt;</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+#include &lt;sys/types.h&gt;</span></span>
<span class="line"><span>+#include &lt;nuttx/board.h&gt;</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Pre-processor Definitions</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Public Functions</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Name: board_app_initialize</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ * Description:</span></span>
<span class="line"><span>+ *   Perform application specific initialization.  This function is never</span></span>
<span class="line"><span>+ *   called directly from application code, but only indirectly via the</span></span>
<span class="line"><span>+ *   (non-standard) boardctl() interface using the command BOARDIOC_INIT.</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ * Input Parameters:</span></span>
<span class="line"><span>+ *   arg - The boardctl() argument is passed to the board_app_initialize()</span></span>
<span class="line"><span>+ *         implementation without modification.  The argument has no</span></span>
<span class="line"><span>+ *         meaning to NuttX; the meaning of the argument is a contract</span></span>
<span class="line"><span>+ *         between the board-specific initialization logic and the</span></span>
<span class="line"><span>+ *         matching application logic.  The value could be such things as a</span></span>
<span class="line"><span>+ *         mode enumeration value, a set of DIP switch switch settings, a</span></span>
<span class="line"><span>+ *         pointer to configuration data read from a file or serial FLASH,</span></span>
<span class="line"><span>+ *         or whatever you would like to do with it.  Every implementation</span></span>
<span class="line"><span>+ *         should accept zero/NULL as a default configuration.</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ * Returned Value:</span></span>
<span class="line"><span>+ *   Zero (OK) is returned on success; a negated errno value is returned on</span></span>
<span class="line"><span>+ *   any failure to indicate the nature of the failure.</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+int board_app_initialize(uintptr_t arg)</span></span>
<span class="line"><span>+{</span></span>
<span class="line"><span>+  /* XXX : it will be implemented later */</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+  return OK;</span></span>
<span class="line"><span>+}</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Name: board_late_initialize</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ * Description:</span></span>
<span class="line"><span>+ *   If CONFIG_BOARD_LATE_INITIALIZE is selected, then an additional</span></span>
<span class="line"><span>+ *   initialization call will be performed in the boot-up sequence to a</span></span>
<span class="line"><span>+ *   function called board_late_initialize().  board_late_initialize()</span></span>
<span class="line"><span>+ *   will be called immediately after up_initialize() is called and just</span></span>
<span class="line"><span>+ *   before the initial application is started.  This additional</span></span>
<span class="line"><span>+ *   initialization phase may be used, for example, to initialize board-</span></span>
<span class="line"><span>+ *   specific device drivers.</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+#ifdef CONFIG_BOARD_LATE_INITIALIZE</span></span>
<span class="line"><span>+void weak_function board_late_initialize(void)</span></span>
<span class="line"><span>+{</span></span>
<span class="line"><span>+  /* XXX : it will be implemented later */</span></span>
<span class="line"><span>+}</span></span>
<span class="line"><span>+#endif</span></span>
<span class="line"><span>diff --git a/cxd32xx_boards/cb2sdb2/src/cxd32_boot.c b/cxd32xx_boards/cb2sdb2/src/cxd32_boot.c</span></span>
<span class="line"><span>new file mode 100644</span></span>
<span class="line"><span>index 0000000..edf4328</span></span>
<span class="line"><span>--- /dev/null</span></span>
<span class="line"><span>+++ b/cxd32xx_boards/cb2sdb2/src/cxd32_boot.c</span></span>
<span class="line"><span>@@ -0,0 +1,56 @@</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * cxd32xx_boards/cb2sdb2/src/cxd32_boot.c</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ * Licensed to the Apache Software Foundation (ASF) under one or more</span></span>
<span class="line"><span>+ * contributor license agreements.  See the NOTICE file distributed with</span></span>
<span class="line"><span>+ * this work for additional information regarding copyright ownership.  The</span></span>
<span class="line"><span>+ * ASF licenses this file to you under the Apache License, Version 2.0 (the</span></span>
<span class="line"><span>+ * &quot;License&quot;); you may not use this file except in compliance with the</span></span>
<span class="line"><span>+ * License.  You may obtain a copy of the License at</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ *   http://www.apache.org/licenses/LICENSE-2.0</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ * Unless required by applicable law or agreed to in writing, software</span></span>
<span class="line"><span>+ * distributed under the License is distributed on an &quot;AS IS&quot; BASIS, WITHOUT</span></span>
<span class="line"><span>+ * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the</span></span>
<span class="line"><span>+ * License for the specific language governing permissions and limitations</span></span>
<span class="line"><span>+ * under the License.</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Included Files</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+#include &lt;nuttx/config.h&gt;</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+#include &lt;debug.h&gt;</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+#include &lt;nuttx/board.h&gt;</span></span>
<span class="line"><span>+#include &lt;arch/board/board.h&gt;</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+#include &quot;arm_internal.h&quot;</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Pre-processor Definitions</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Private Functions</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Public Functions</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+/****************************************************************************</span></span>
<span class="line"><span>+ * Name: cxd32_boardinitialize</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ * Description:</span></span>
<span class="line"><span>+ *</span></span>
<span class="line"><span>+ ****************************************************************************/</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+void cxd32_boardinitialize(void)</span></span>
<span class="line"><span>+{</span></span>
<span class="line"><span>+  /* XXX : it will be implemented later */</span></span>
<span class="line"><span>+}</span></span></code></pre></div>`,18)]))}const m=e(c,[["render",t]]);export{b as __pageData,m as default};
