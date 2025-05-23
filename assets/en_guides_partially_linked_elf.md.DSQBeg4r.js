import{_ as s,a as e}from"./chunks/system_arch_stm32f303xBC_and_f358xC.BsKV4D6d.js";import{_ as n,c as p,al as l,o as i}from"./chunks/framework.NFAqBSgQ.js";const g=JSON.parse('{"title":"ELF Programs -- With Symbol Tables","description":"","frontmatter":{},"headers":[],"relativePath":"en/guides/partially_linked_elf.md","filePath":"en/guides/partially_linked_elf.md"}'),t={name:"en/guides/partially_linked_elf.md"};function o(c,a,r,d,h,u){return i(),p("div",null,a[0]||(a[0]=[l(`<h1 id="elf-programs-with-symbol-tables" tabindex="-1">ELF Programs -- With Symbol Tables <a class="header-anchor" href="#elf-programs-with-symbol-tables" aria-label="Permalink to &quot;ELF Programs -- With Symbol Tables&quot;">​</a></h1><p>Warning</p><p>Migrated from: <a href="https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=139629543" target="_blank" rel="noreferrer">https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=139629543</a></p><h2 id="updating-a-release-system-with-elf-programs-with-symbol-tables" tabindex="-1">Updating a Release System with ELF Programs -- With Symbol Tables <a class="header-anchor" href="#updating-a-release-system-with-elf-programs-with-symbol-tables" aria-label="Permalink to &quot;Updating a Release System with ELF Programs -- With Symbol Tables&quot;">​</a></h2><p>You can easily extend the firmware in your released, embedded system using ELF programs provided via a file system. For example, an SD card or, perhaps, downloaded into on-board SPI FLASH.</p><p>In order to support such post-release updates, your released firmware must support execution of ELF programs loaded into RAM and symbol tables also provided via the file system (see [apps/examples/elf]{.title-ref}).</p><p>The files shown in this Wiki page can be downloaded <a href="https://cwiki.apache.org/confluence/download/attachments/139629402/elfprog-wsymtab.tar.gz?version=1&amp;modificationDate=1576735523000&amp;api=v2" target="_blank" rel="noreferrer">here</a></p><h2 id="creating-a-symbol-table" tabindex="-1">Creating a Symbol Table <a class="header-anchor" href="#creating-a-symbol-table" aria-label="Permalink to &quot;Creating a Symbol Table&quot;">​</a></h2><p>There are several ways to create an application symbol table. Only two are compatible with the example provided here:</p><ol><li><p><strong>Board-specific Bring-up Logic</strong> Build a symbol table into the base firmware and add it to your board-specific bring-up logic. This technique is typically used in kernel mode with <code>CONFIG_USER_INITPATH=y</code>.</p><p>In this setup, the system does not initialize using a standard C call like <code>nsh_main()</code>. Instead, it starts with an <code>init</code> ELF program, similar to how Linux initializes. The configuration option <code>CONFIG_EXECFUNCS_SYMTAB_ARRAY</code> initializes the system with a minimal set of symbols required by the <code>init</code> program. Once initialized, the <code>init</code> program would typically call <code>boardctl()</code> to put the final symbol table in place.</p><p>To enable this method, you must:</p><ul><li>Set <code>CONFIG_EXECFUNCS_HAVE_SYMTAB=y</code> in your configuration.</li><li>Provide a symbol table with the global name <code>CONFIG_EXECFUNCS_SYMTAB_ARRAY</code> with the variable name <code>CONFIG_EXECFUNCS_NSYMBOLS_VAR</code> that holds the number of symbol entries. The default symbol table name is <code>g_symtab</code>.</li></ul><p>In this example, let&#39;s illustrate this using an STM32F4-Discovery configuration. We will assume that you have modified the <code>boards/arm/stm32/stm32fdiscovery/src/stm32_bringup.c</code> file, adding the following:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;nuttx/binfmt/symtab.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const struct symtab_s g_symtab[] = {</span></span>
<span class="line"><span>    {&quot;printf&quot;, (FAR void *)printf}</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int g_nsymbols = 1;</span></span></code></pre></div><p>This is a simple symbol table containing only the symbol string &quot;printf,&quot; whose value is the address of the function <code>printf()</code>.</p><p>There is, of course, a lot more that could be said about generating symbol tables. NuttX provides specialized tools in the <code>tools/</code> directory and instructions elsewhere for generating more extensive symbol tables. However, this example keeps things simple to focus on the core functionality.</p></li><li><p><strong>Application Logic</strong> Alternatively, the symbol table can be provided dynamically by the application itself, using the <code>boardctl()</code> system interface. The specific <code>boardctl()</code> command to use is <code>BOARDIOC_APP_SYMTAB</code>. This command provides the symbol table in the same way as the board-specific logic but allows for application-level control.</p><p>To use this approach, you need to:</p><ul><li>Enable the configurations <code>CONFIG_LIB_BOARDCTL=y</code> and <code>CONFIG_BOARDCTL_APP_SYMTAB=y</code>.</li><li>Include application logic to provide the symbol table. If <code>CONFIG_EXAMPLES_NSH_SYMTAB=y</code> is set, NSH can handle this automatically.</li></ul></li></ol><h2 id="export-package" tabindex="-1">Export Package <a class="header-anchor" href="#export-package" aria-label="Permalink to &quot;Export Package&quot;">​</a></h2><p>At the time of firmware release, you should create and save an export package. This export package contains all the necessary files required to create post-release add-on modules for your embedded system.</p><p>For demonstration purposes, we use the STM32F4-Discovery with the network NSH configuration. This setup assumes that you have the STM32F4DIS-BB baseboard. The demonstration also requires support for externally modifiable media, such as:</p><ul><li>Removable media, like an SD card or USB flash drive.</li><li>An internal file system remotely accessible via USB MSC, FTP, or other protocols.</li><li>A remote file system, such as NFS.</li></ul><p>In this demonstration, the networking NSH configuration uses the SD card on the STM32 baseboard. Other NSH configurations can also be used, provided they supply the necessary file system support.</p><p>(No baseboard? You can add file system support to the basic <code>STM32F4-Discovery</code> board by following these instructions: <a href="https://www.youtube.com/watch?v=5hB5ZXpRoS4" target="_blank" rel="noreferrer">USB FLASH drive</a> or <a href="https://www.youtube.com/watch?v=H28t4RbOXqI" target="_blank" rel="noreferrer">SD card</a>.)</p><p>Example for STM32F4-Discovery:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make distclean</span></span>
<span class="line"><span> tools/configure.sh -c stm32f4discovery:netnsh</span></span>
<span class="line"><span> make menuconfig</span></span></code></pre></div><p>Required configurations:</p><ul><li>Disable networking: <code># CONFIG_NET is not set</code></li><li>Enable ELF binary support: <code>CONFIG_ELF=y</code>, <code>CONFIG_LIBC_EXECFUNCS=y</code>, <code>CONFIG_EXECFUNCS_HAVE_SYMTAB=y</code>, <code>CONFIG_EXECFUNCS_SYMTAB_ARRAY=&quot;g_symtab&quot;</code> and <code>CONFIG_EXECFUNCS_NSYMBOLS_VAR=&quot;g_nsymbols&quot;</code></li><li>Enable PATH variable support: <code>CONFIG_BINFMT_EXEPATH=y</code>, <code>CONFIG_PATH_INITIAL=&quot;/bin&quot;</code></li><li>Enable execution from NSH: <code>CONFIG_NSH_FILE_APPS=y</code></li></ul><p>Then, build the NuttX firmware image and the export package:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make</span></span>
<span class="line"><span> make export</span></span></code></pre></div><p>When <code>make export</code> completes, you will find a ZIP package in the top-level NuttX directory called <code>nuttx-export-x.y.zip</code> (where x.y corresponds to the version, determined by the .version file in the same directory). The contents of this ZIP file are organized as follows:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nuttx-export-x.x</span></span>
<span class="line"><span>|- arch/</span></span>
<span class="line"><span>|- build/</span></span>
<span class="line"><span>|- include/</span></span>
<span class="line"><span>|- libs/</span></span>
<span class="line"><span>|- startup/</span></span>
<span class="line"><span>|- System.map</span></span>
<span class="line"><span>\`- .config</span></span></code></pre></div><h2 id="add-on-build-directory" tabindex="-1">Add-On Build Directory <a class="header-anchor" href="#add-on-build-directory" aria-label="Permalink to &quot;Add-On Build Directory&quot;">​</a></h2><p>In order to create the add-on ELF program, you will need:</p><ol><li>The export package.</li><li>A program build Makefile.</li><li>A linker script used by the Makefile.</li></ol><p>The example Makefile discussed below assumes the use of a GNU toolchain. Note that non-GNU toolchains would likely require a significantly different Makefile and linker script.</p><h2 id="hello-example" tabindex="-1">Hello Example <a class="header-anchor" href="#hello-example" aria-label="Permalink to &quot;Hello Example&quot;">​</a></h2><p>To keep things manageable, let&#39;s use a concrete example. Suppose the ELF program that we wish to add to the release code is the simple source file <code>hello.c</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main(int argc, char **argv)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  printf(&quot;Hello from Add-On Program!\\n&quot;);</span></span>
<span class="line"><span>  return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Let&#39;s say that we have a directory called <code>addon</code> that contains the following:</p><ol><li>The <code>hello.c</code> source file.</li><li>A Makefile to build the ELF program.</li><li>A linker script called <code>gnu-elf.ld</code> needed by the Makefile.</li><li>The export package <code>nuttx-export-7.25.zip</code>.</li></ol><h2 id="building-the-elf-program" tabindex="-1">Building the ELF Program <a class="header-anchor" href="#building-the-elf-program" aria-label="Permalink to &quot;Building the ELF Program&quot;">​</a></h2><p>The first step in creating the ELF program is to unzip the export package. Starting in the <code>addon</code> directory:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> cd addon</span></span>
<span class="line"><span> ls</span></span>
<span class="line"><span>gnu-elf.ld hello.c Makefile nuttx-export-7.25.zip</span></span></code></pre></div><p>Where: - <code>gnu-elf.ld</code> is the linker script. - <code>hello.c</code> is the example source file. - <code>Makefile</code> builds the ELF program. - <code>nuttx-export-7.25.zip</code> is the export package from NuttX 7.25.</p><p>Unzip the export package as follows:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> unzip nuttx-export-7.25.zip</span></span></code></pre></div><p>This creates a new directory called <code>nuttx-export-7.25</code>, containing all the content from the released NuttX code required to build the ELF program.</p><h2 id="the-makefile" tabindex="-1">The Makefile <a class="header-anchor" href="#the-makefile" aria-label="Permalink to &quot;The Makefile&quot;">​</a></h2><p>To build the ELF program, simply run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make</span></span></code></pre></div><p>This uses the following Makefile to generate several files: - <code>hello.o</code>: The compiled object file for <code>hello.c</code>. - <code>hello</code>: The linked ELF program.</p><p>Only the resulting <code>hello</code> file is needed.</p><p>The Makefile used to create the ELF program is as follows:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>include nuttx-export-7.25/build/Make.defs</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Long calls are need to call from RAM into FLASH</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ARCHCFLAGS += -mlong-calls</span></span>
<span class="line"><span>ARCHWARNINGS = -Wall -Wstrict-prototypes -Wshadow -Wundef</span></span>
<span class="line"><span>ARCHOPTIMIZATION = -Os -fno-strict-aliasing -fno-strength-reduce -fomit-frame-pointer</span></span>
<span class="line"><span>ARCHINCLUDES = -I. -isystem  nuttx-export-7.25/include</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CFLAGS = (ARCHCFLAGS) (ARCHWARNINGS) (ARCHOPTIMIZATION) (ARCHINCLUDES) -pipe</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CROSSDEV = arm-none-eabi-</span></span>
<span class="line"><span>CC = (CROSSDEV)gcc</span></span>
<span class="line"><span>LD = (CROSSDEV)ld</span></span>
<span class="line"><span>STRIP = (CROSSDEV)strip --strip-unneeded</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Setup up linker command line options</span></span>
<span class="line"><span></span></span>
<span class="line"><span>LDELFFLAGS = -r -e main</span></span>
<span class="line"><span>LDELFFLAGS += -T gnu-elf.ld</span></span>
<span class="line"><span></span></span>
<span class="line"><span># This might change in a different environment</span></span>
<span class="line"><span></span></span>
<span class="line"><span>OBJEXT ?= .o</span></span>
<span class="line"><span></span></span>
<span class="line"><span># This is the generated ELF program</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BIN = hello</span></span>
<span class="line"><span></span></span>
<span class="line"><span># These are the sources files that we use</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SRCS = hello.c</span></span>
<span class="line"><span>OBJS = (SRCS:.c=(OBJEXT))</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Build targets</span></span>
<span class="line"><span></span></span>
<span class="line"><span>all: (BIN)</span></span>
<span class="line"><span>.PHONY: clean</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(OBJS): %(OBJEXT): %.c</span></span>
<span class="line"><span>(CC) -c (CFLAGS) &lt; -o @</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(BIN): (OBJS)</span></span>
<span class="line"><span>(LD) (LDELFFLAGS) -o @ ^</span></span>
<span class="line"><span>(STRIP) (BIN)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>clean:</span></span>
<span class="line"><span>rm -f (BIN)</span></span>
<span class="line"><span>rm -f *.o</span></span></code></pre></div><h2 id="the-linker-script" tabindex="-1">The Linker Script <a class="header-anchor" href="#the-linker-script" aria-label="Permalink to &quot;The Linker Script&quot;">​</a></h2><p>The linker script that I am using in this example, gnu-elf.ld, contains the following:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SECTIONS</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>.text 0x00000000 :</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>    _stext = . ;</span></span>
<span class="line"><span>    *(.text)</span></span>
<span class="line"><span>    *(.text.*)</span></span>
<span class="line"><span>    *(.gnu.warning)</span></span>
<span class="line"><span>    *(.stub)</span></span>
<span class="line"><span>    *(.glue_7)</span></span>
<span class="line"><span>    *(.glue_7t)</span></span>
<span class="line"><span>    *(.jcr)</span></span>
<span class="line"><span>    _etext = . ;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.rodata :</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>    _srodata = . ;</span></span>
<span class="line"><span>    *(.rodata)</span></span>
<span class="line"><span>    *(.rodata1)</span></span>
<span class="line"><span>    *(.rodata.*)</span></span>
<span class="line"><span>    *(.gnu.linkonce.r*)</span></span>
<span class="line"><span>    _erodata = . ;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.data :</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>    _sdata = . ;</span></span>
<span class="line"><span>    *(.data)</span></span>
<span class="line"><span>    *(.data1)</span></span>
<span class="line"><span>    *(.data.*)</span></span>
<span class="line"><span>    *(.gnu.linkonce.d*)</span></span>
<span class="line"><span>    _edata = . ;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.bss :</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>    _sbss = . ;</span></span>
<span class="line"><span>    *(.bss)</span></span>
<span class="line"><span>    *(.bss.*)</span></span>
<span class="line"><span>    *(.sbss)</span></span>
<span class="line"><span>    *(.sbss.*)</span></span>
<span class="line"><span>    *(.gnu.linkonce.b*)</span></span>
<span class="line"><span>    *(COMMON)</span></span>
<span class="line"><span>    _ebss = . ;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /* Stabs debugging sections.    */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    .stab 0 : { *(.stab) }</span></span>
<span class="line"><span>    .stabstr 0 : { *(.stabstr) }</span></span>
<span class="line"><span>    .stab.excl 0 : { *(.stab.excl) }</span></span>
<span class="line"><span>    .stab.exclstr 0 : { *(.stab.exclstr) }</span></span>
<span class="line"><span>    .stab.index 0 : { *(.stab.index) }</span></span>
<span class="line"><span>    .stab.indexstr 0 : { *(.stab.indexstr) }</span></span>
<span class="line"><span>    .comment 0 : { *(.comment) }</span></span>
<span class="line"><span>    .debug_abbrev 0 : { *(.debug_abbrev) }</span></span>
<span class="line"><span>    .debug_info 0 : { *(.debug_info) }</span></span>
<span class="line"><span>    .debug_line 0 : { *(.debug_line) }</span></span>
<span class="line"><span>    .debug_pubnames 0 : { *(.debug_pubnames) }</span></span>
<span class="line"><span>    .debug_aranges 0 : { *(.debug_aranges) }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="replacing-nsh-built-in-functions" tabindex="-1">Replacing NSH Built-In Functions <a class="header-anchor" href="#replacing-nsh-built-in-functions" aria-label="Permalink to &quot;Replacing NSH Built-In Functions&quot;">​</a></h2><p>Files can be executed by NSH from the command line by simply typing the name of the ELF program. This requires (1) that the feature be enabled with <code>CONFIG_NSH_FILE_APP=y</code> and (2) that support for the PATH variable is enabled with <code>CONFIG_BINFMT_EXEPATH=y</code> and <code>CONFIG_PATH_INITIAL</code> set to the mount point of the file system that may contain ELF programs.</p><p>In this example, there is no application in the base firmware called <code>hello</code>. So attempts to run <code>hello</code> will fail:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nsh&gt; hello</span></span>
<span class="line"><span>nsh: hello: command not found</span></span>
<span class="line"><span>nsh&gt;</span></span></code></pre></div><p>But if we mount the SD card containing the <code>hello</code> image that we created above, then we can successfully execute the <code>hello</code> command:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nsh&gt; mount -t vfat /dev/mmcsd0 /bin</span></span>
<span class="line"><span>nsh&gt; ls /bin</span></span>
<span class="line"><span>/bin:</span></span>
<span class="line"><span> System Volume Information/</span></span>
<span class="line"><span> hello</span></span>
<span class="line"><span>nsh&gt; hello</span></span>
<span class="line"><span>Hello from Add-On Program!</span></span>
<span class="line"><span>nsh&gt;</span></span></code></pre></div><p>Here we showed how you can add a new command to NSH to a product without modifying the base firmware. We can also replace or update an existing built-in application in this way:</p><p>In the above configuration, NSH will first attempt to run the program called <code>hello</code> from the file system. This will fail because we have not yet put our custom <code>hello</code> ELF program in the file system. So instead, NSH will fallback and execute the built-in application called <code>hello</code>. In this way, any command known to NSH can be replaced from an ELF program installed in a mounted file system directory that can be found via the PATH variable.</p><p>After we do add our custom <code>hello</code> to the file system, when NSH attempts to run the program called <code>hello</code> from the file system it will run successfully. The built-in version will be ignored. It has been replaced with the version in the file system.</p><h2 id="tightly-coupled-memories" tabindex="-1">Tightly Coupled Memories <a class="header-anchor" href="#tightly-coupled-memories" aria-label="Permalink to &quot;Tightly Coupled Memories&quot;">​</a></h2><p>Most MCUs based on ARMv7-M family processors support some kind of Tightly Coupled Memory (TCM). These TCMs have somewhat different properties for specialized operations. Depending on the bus matrix of the processor, you may not be able to execute programs from the TCM. For instance, the STM32 F4 supports Core Coupled Memory (CCM), but since it is tied directly to the D-bus, it cannot be used to execute programs! On the other hand, the STM32F3 has a CCM that is accessible to both the D-Bus and the I-Bus, in which case it should be possible to execute programs from this TCM.</p><p><img src="`+s+'" alt="image"></p><p><img src="'+e+'" alt="image"></p><p>When ELF programs are loaded into memory, the memory is allocated from the heap via a standard memory allocator. By default with the STM32 F4, the CCM is included in the heap and will typically be allocated first. If CCM memory is allocated to hold the ELF program in memory, then a hard-fault will occur immediately when you try to execute the ELF program in memory.</p><p>Therefore, it is necessary on STM32 F4 platforms to include the following configuration setting:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CONFIG_STM32_CCMEXCLUDE=y</span></span></code></pre></div><p>With that setting, the CCM memory will be excluded from the heap and so will never be allocated for ELF program memory.</p>',67)]))}const f=n(t,[["render",o]]);export{g as __pageData,f as default};
