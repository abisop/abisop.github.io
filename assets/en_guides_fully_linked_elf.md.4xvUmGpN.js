import{_ as a,a as n}from"./chunks/system_arch_stm32f303xBC_and_f358xC.BsKV4D6d.js";import{_ as e,c as p,al as l,o as i}from"./chunks/framework.NFAqBSgQ.js";const b=JSON.parse('{"title":"ELF Programs -- No Symbol Tables","description":"","frontmatter":{},"headers":[],"relativePath":"en/guides/fully_linked_elf.md","filePath":"en/guides/fully_linked_elf.md"}'),t={name:"en/guides/fully_linked_elf.md"};function o(c,s,d,r,h,u){return i(),p("div",null,s[0]||(s[0]=[l(`<h1 id="elf-programs-no-symbol-tables" tabindex="-1">ELF Programs -- No Symbol Tables <a class="header-anchor" href="#elf-programs-no-symbol-tables" aria-label="Permalink to &quot;ELF Programs -- No Symbol Tables&quot;">​</a></h1><p>Warning</p><p>Migrated from: <a href="https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=139629542" target="_blank" rel="noreferrer">https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=139629542</a></p><p>You can easily extend the firmware in your released, embedded system using ELF programs provided via a file system (for example, an SD card or downloaded into on-board SPI FLASH). In order to support such post-release updates, your released firmware would have to support execution of fully linked, relocatable ELF programs loaded into RAM (see, for example, <code>apps/examples/elf</code>).</p><p>The files shown in this Wiki page can be downloaded <a href="https://cwiki.apache.org/confluence/download/attachments/139629402/elfprog-nosymtab.tar.gz?version=1&amp;modificationDate=1576735520000&amp;api=v2" target="_blank" rel="noreferrer">here</a>.</p><p>Alan Carvalho de Assis has also made a video based on this example in the YouTube <a href="https://www.youtube.com/watch?v=oL6KAgkTb8M" target="_blank" rel="noreferrer">NuttX Channel</a>.</p><h2 id="creating-the-export-package" tabindex="-1">Creating the Export Package <a class="header-anchor" href="#creating-the-export-package" aria-label="Permalink to &quot;Creating the Export Package&quot;">​</a></h2><p>At the time that you release the firmware, you should create and save an export package. The export package is all that you need to create post-release, add-on modules for your embedded system. Let&#39;s illustrate this using the <code>STM32F4-Discovery</code> networking <code>NSH</code> configuration with the <code>STM32F4DIS-BB</code> baseboard. (This demonstration assumes that you also have support for some externally modifiable media in the board configuration, such as removable media like an SD card, or a USB FLASH stick, an internal file system remotely accessible via USB MSC, FTP, or any remote file system (NFS). The networking <code>NSH</code> configuration uses the SD card on the STM32 baseboard for this demonstration. Other <code>NSH</code> configurations could be used, provided that you supply the necessary file system support in some fashion.)</p><p>(No baseboard? You can add file system support to the basic <code>STM32F4-Discovery</code> board by following these instructions: <a href="https://www.youtube.com/watch?v=5hB5ZXpRoS4" target="_blank" rel="noreferrer">USB FLASH drive</a> or <a href="https://www.youtube.com/watch?v=H28t4RbOXqI" target="_blank" rel="noreferrer">SD card</a>.)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make distclean</span></span>
<span class="line"><span> tools/configure.sh -c stm32f4discovery:netnsh</span></span>
<span class="line"><span> make menuconfig</span></span></code></pre></div><p>Your released firmware would have to have been built with a few important configuration settings:</p><ol><li>Disable networking (Only because it is not needed in this example):</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># CONFIG_NET is not set</span></span></code></pre></div><ol start="2"><li>Enable basic ELF binary support with no built-in symbol table support:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CONFIG_ELF=y</span></span>
<span class="line"><span>CONFIG_LIBC_EXECFUNCS=y</span></span>
<span class="line"><span># CONFIG_EXECFUNCS_HAVE_SYMTAB is not set</span></span></code></pre></div><ol start="3"><li>Enable PATH variable support:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CONFIG_BINFMT_EXEPATH=y</span></span>
<span class="line"><span>CONFIG_PATH_INITIAL=&quot;/bin&quot;</span></span>
<span class="line"><span># CONFIG_DISABLE_ENVIRON not set</span></span></code></pre></div><ol start="4"><li>Enable execution of ELF files from the <code>NSH</code> command line:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CONFIG_NSH_FILE_APPS=y</span></span></code></pre></div><p>Note</p><p>You must enable some application that uses <code>printf()</code>. This is necessary to assure that the symbol <code>printf()</code> is included in the base system. Here we assume that you include the &quot;Hello, World!&quot; example from <code>apps/examples/hello</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CONFIG_EXAMPLES_HELLO=y</span></span></code></pre></div><p>Then we can build the NuttX firmware image and the export package:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make</span></span>
<span class="line"><span> make export</span></span></code></pre></div><p>When <code>make export</code> completes, you will find a ZIP&#39;ed package in the top-level NuttX directory called <code>nuttx-export-x.y.zip</code> (for version <code>x.y</code>). The version is determined by the <code>.version</code> file in the same directory. The content of this ZIP file is the following directory structure:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nuttx-export-x.x</span></span>
<span class="line"><span> |- arch/</span></span>
<span class="line"><span> |- build/</span></span>
<span class="line"><span> |- include/</span></span>
<span class="line"><span> |- libs/</span></span>
<span class="line"><span> |- startup/</span></span>
<span class="line"><span> |- System.map</span></span>
<span class="line"><span> \`- .config</span></span></code></pre></div><h2 id="the-add-on-build-directory" tabindex="-1">The Add-On Build Directory <a class="header-anchor" href="#the-add-on-build-directory" aria-label="Permalink to &quot;The Add-On Build Directory&quot;">​</a></h2><p>In order to create the add-on ELF program, you will need (1) the export package, (2) the program build <code>Makefile</code>, (3) a linker script used by the <code>Makefile</code>, and (4) a Bash script to create a linker script. That <code>Makefile</code> and Bash Script are discussed in the following paragraphs.</p><p>Note</p><p>These example files implicitly assume a GNU tool chain is used and, in at least one place, that the target is an ARMv7-M platform. A non-GNU tool chain would probably require a significantly different <code>Makefile</code> and linker script. There is at least one ARMv7-M specific change that would have to be made for other platforms in the script that creates the linker script (<code>mkdefines.sh</code>).</p><h2 id="hello-example" tabindex="-1">Hello Example <a class="header-anchor" href="#hello-example" aria-label="Permalink to &quot;Hello Example&quot;">​</a></h2><p>To keep things manageable, let&#39;s use a concrete example. Suppose the ELF program that we wish to add to the release code is the single source file <code>hello.c</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main(int argc, char **argv)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  printf(&quot;Hello from Add-On Program!\\n&quot;);</span></span>
<span class="line"><span>  return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Let&#39;s say that we have a directory called <code>addon</code> and it contains the <code>hello.c</code> source file, a <code>Makefile</code> that will create the ELF program, and a Bash script called <code>mkdefines.sh</code> that will create a linker script.</p><h2 id="building-the-elf-program" tabindex="-1">Building the ELF Program <a class="header-anchor" href="#building-the-elf-program" aria-label="Permalink to &quot;Building the ELF Program&quot;">​</a></h2><p>The first step in creating the ELF program is to unzip the Export Package. We start with our <code>addon</code> directory containing the following:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> cd addon</span></span>
<span class="line"><span> ls</span></span>
<span class="line"><span>gnu-elf.ld hello.c Makefile mkdefines.sh nuttx-export-7.25.zip</span></span></code></pre></div><p>Where:</p><ul><li><code>gnu-elf.ld</code> is the linker script.</li><li><code>hello.c</code> is our example source file.</li><li><code>Makefile</code> will build our ELF program and symbol table.</li><li><code>mksymtab.h</code> is the Bash script that will create the symbol table for the ELF program.</li><li><code>nuttx-export-7.25.zip</code> is the Export Package for NuttX-7.25.</li></ul><p>We unzip the Export Package like:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> unzip nuttx-export-7.25.zip</span></span></code></pre></div><p>Then we have a new directory called <code>nuttx-export-7.25</code> that contains all of the content from the released NuttX code that we need to build the ELF program.</p><h2 id="the-makefile" tabindex="-1">The Makefile <a class="header-anchor" href="#the-makefile" aria-label="Permalink to &quot;The Makefile&quot;">​</a></h2><p>The ELF program is created simply as:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make</span></span></code></pre></div><p>This uses the following <code>Makefile</code> to generate several files:</p><ul><li><code>hello.o</code>: The compiled <code>hello.c</code> object.</li><li><code>hello.r</code>: A &quot;partially linked&quot; ELF object that still has undefined symbols.</li><li><code>hello</code>: The fully linked, relocatable ELF program.</li><li><code>linker.ld</code>: A linker script created by <code>mkdefines.sh</code>.</li></ul><p>Only the resulting <code>hello</code> is needed.</p><p>Below is the <code>Makefile</code> used to create the ELF program:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>include nuttx-export-7.25/build/Make.defs</span></span>
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
<span class="line"><span>LDRELFLAGS = -r</span></span>
<span class="line"><span></span></span>
<span class="line"><span>LDELFFLAGS = -r -e main</span></span>
<span class="line"><span>LDELFFLAGS += -T defines.ld -T gnu-elf.ld</span></span>
<span class="line"><span></span></span>
<span class="line"><span># This might change in a different environment</span></span>
<span class="line"><span></span></span>
<span class="line"><span>OBJEXT ?= .o</span></span>
<span class="line"><span></span></span>
<span class="line"><span># This is the generated ELF program</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BIN = hello</span></span>
<span class="line"><span>REL = hello.r</span></span>
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
<span class="line"><span>(CC) -c (CFLAGS) -o @ &lt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>System.map: nuttx-export-7.25/System.map</span></span>
<span class="line"><span>cat nuttx-export-7.25/System.map | sed -e &quot;s/\\r//g&quot; &gt;System.map</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(REL): (OBJS)</span></span>
<span class="line"><span>(LD) (LDRELFLAGS) -o @ &lt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>defines.ld: System.map (REL)</span></span>
<span class="line"><span>./mkdefines.sh System.map &quot;(REL)&quot; &gt;defines.ld</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(BIN): defines.ld (REL)</span></span>
<span class="line"><span>(LD) (LDELFFLAGS) -o @ (REL)</span></span>
<span class="line"><span>(STRIP) (REL)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>clean:</span></span>
<span class="line"><span>rm -f (BIN)</span></span>
<span class="line"><span>rm -f (REL)</span></span>
<span class="line"><span>rm -f defines.ld</span></span>
<span class="line"><span>rm -f System.map</span></span>
<span class="line"><span>rm -f *.o</span></span></code></pre></div><h2 id="the-linker-script" tabindex="-1">The Linker Script <a class="header-anchor" href="#the-linker-script" aria-label="Permalink to &quot;The Linker Script&quot;">​</a></h2><p>Two linker scripts are used. One is a normal file (we&#39;ll call it the main linker script), and the other, <code>defines.ld</code>, is created on-the-fly as described in the next section.</p><p>The main linker script, <code>gnu-elf.ld</code>, contains the following:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SECTIONS</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>.text 0x00000000 :</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      _stext = . ;</span></span>
<span class="line"><span>      *(.text)</span></span>
<span class="line"><span>      *(.text.*)</span></span>
<span class="line"><span>      *(.gnu.warning)</span></span>
<span class="line"><span>      *(.stub)</span></span>
<span class="line"><span>      *(.glue_7)</span></span>
<span class="line"><span>      *(.glue_7t)</span></span>
<span class="line"><span>      *(.jcr)</span></span>
<span class="line"><span>      _etext = . ;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.rodata :</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      _srodata = . ;</span></span>
<span class="line"><span>      *(.rodata)</span></span>
<span class="line"><span>      *(.rodata1)</span></span>
<span class="line"><span>      *(.rodata.*)</span></span>
<span class="line"><span>      *(.gnu.linkonce.r*)</span></span>
<span class="line"><span>      _erodata = . ;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.data :</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      _sdata = . ;</span></span>
<span class="line"><span>      *(.data)</span></span>
<span class="line"><span>      *(.data1)</span></span>
<span class="line"><span>      *(.data.*)</span></span>
<span class="line"><span>      *(.gnu.linkonce.d*)</span></span>
<span class="line"><span>      _edata = . ;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.bss :</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      _sbss = . ;</span></span>
<span class="line"><span>      *(.bss)</span></span>
<span class="line"><span>      *(.bss.*)</span></span>
<span class="line"><span>      *(.sbss)</span></span>
<span class="line"><span>      *(.sbss.*)</span></span>
<span class="line"><span>      *(.gnu.linkonce.b*)</span></span>
<span class="line"><span>      *(COMMON)</span></span>
<span class="line"><span>      _ebss = . ;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* Stabs debugging sections.    */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   .stab 0 : { *(.stab) }</span></span>
<span class="line"><span>   .stabstr 0 : { *(.stabstr) }</span></span>
<span class="line"><span>   .stab.excl 0 : { *(.stab.excl) }</span></span>
<span class="line"><span>   .stab.exclstr 0 : { *(.stab.exclstr) }</span></span>
<span class="line"><span>   .stab.index 0 : { *(.stab.index) }</span></span>
<span class="line"><span>   .stab.indexstr 0 : { *(.stab.indexstr) }</span></span>
<span class="line"><span>   .comment 0 : { *(.comment) }</span></span>
<span class="line"><span>   .debug_abbrev 0 : { *(.debug_abbrev) }</span></span>
<span class="line"><span>   .debug_info 0 : { *(.debug_info) }</span></span>
<span class="line"><span>   .debug_line 0 : { *(.debug_line) }</span></span>
<span class="line"><span>   .debug_pubnames 0 : { *(.debug_pubnames) }</span></span>
<span class="line"><span>   .debug_aranges 0 : { *(.debug_aranges) }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="creating-the-defines-ld-linker-script" tabindex="-1">Creating the <code>defines.ld</code> Linker Script <a class="header-anchor" href="#creating-the-defines-ld-linker-script" aria-label="Permalink to &quot;Creating the \`defines.ld\` Linker Script&quot;">​</a></h2><p>The additional linker script <code>defines.ld</code> is created through a three-step process:</p><ol><li>The <code>Makefile</code> generates a partially linked ELF object, <code>hello.r</code>.</li><li>The <code>Makefile</code> then invokes the <code>mkdefines.sh</code> script, which generates the <code>defines.ld</code> linker script that provides values for all of the undefined symbols.</li><li>Finally, the <code>Makefile</code> produces the fully linked, relocatable <code>hello</code> ELF object using the <code>defines.ld</code> linker script.</li></ol><p>Below is the version of <code>mkdefines.sh</code> used in this demo:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span>usage=&quot;Usage: 0 &lt;system-map&gt; &lt;relprog&gt;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Check for the required path to the System.map file</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sysmap=1</span></span>
<span class="line"><span>if [ -z &quot;sysmap&quot; ]; then</span></span>
<span class="line"><span>echo &quot;ERROR: Missing &lt;system-map&gt;&quot;</span></span>
<span class="line"><span>echo &quot;&quot;</span></span>
<span class="line"><span>echo usage</span></span>
<span class="line"><span>exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Check for the required partially linked file</span></span>
<span class="line"><span></span></span>
<span class="line"><span>relprog=2</span></span>
<span class="line"><span>if [ -z &quot;relprog&quot; ]; then</span></span>
<span class="line"><span>echo &quot;ERROR: Missing &lt;program-list&gt;&quot;</span></span>
<span class="line"><span>echo &quot;&quot;</span></span>
<span class="line"><span>echo usage</span></span>
<span class="line"><span>exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Verify the System.map and the partially linked file</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ ! -r &quot;sysmap&quot; ]; then</span></span>
<span class="line"><span>echo &quot;ERROR:  sysmap does not exist&quot;</span></span>
<span class="line"><span>echo &quot;&quot;</span></span>
<span class="line"><span>echo usage</span></span>
<span class="line"><span>exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ ! -r &quot;relprog&quot; ]; then</span></span>
<span class="line"><span>echo &quot;ERROR:  relprog does not exist&quot;</span></span>
<span class="line"><span>echo &quot;&quot;</span></span>
<span class="line"><span>echo usage</span></span>
<span class="line"><span>exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Extract all of the undefined symbols from the partially linked file and create a</span></span>
<span class="line"><span># list of sorted, unique undefined variable names.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>varlist=\`nm relprog | fgrep &#39; U &#39; | sed -e &quot;s/^[ ]*//g&quot; | cut -d&#39; &#39; -f2 | sort - | uniq\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Now output the linker script that provides a value for all of the undefined symbols</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for var in varlist; do</span></span>
<span class="line"><span>map=\`grep &quot; {var}&quot; {sysmap}\`</span></span>
<span class="line"><span>if [ -z &quot;map&quot; ]; then</span></span>
<span class="line"><span>   echo &quot;ERROR:  Variable var not found in sysmap&quot;</span></span>
<span class="line"><span>   echo &quot;&quot;</span></span>
<span class="line"><span>   echo usage</span></span>
<span class="line"><span>   exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>varaddr=\`echo {map} | cut -d&#39; &#39; -f1\`</span></span>
<span class="line"><span>echo &quot;{var} = 0x{varaddr} | 0x00000001;&quot;</span></span>
<span class="line"><span>done</span></span></code></pre></div><p>This script uses the <code>nm</code> utility to find all of the undefined symbols in the ELF object, then searches for the address of each undefined symbol in the <code>System.map</code> that was created when the released firmware was built. Finally, it uses the symbol name and the symbol address to create each symbol table entry.</p><p>Note</p><ul><li>For the ARMv7-M architecture, bit 0 of the address must be set to indicate thumb mode. If you are using a different architecture that requires normal aligned addresses, you will need to change the following line by eliminating the ORed value:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>echo &quot;{var} = 0x{varaddr} | 0x00000001;&quot;</span></span></code></pre></div><ul><li>If the new ELF module uses a symbol that is not provided in the base firmware and, hence, not included in the <code>System.map</code> file, this script will fail. In that case, you will need to provide the missing logic within the ELF program itself, if possible.</li><li>The technique as described here is only valid in the FLAT build mode. It could probably also be extended to work in the PROTECTED mode by substituting <code>User.map</code> for <code>System.map</code>.</li></ul><p>Here is an example <code>defines.ld</code> created by <code>mkdefines.sh</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>printf = 0x0800aefc | 0x00000001 ;</span></span></code></pre></div><h2 id="replacing-an-nsh-built-in-function" tabindex="-1">Replacing an NSH Built-In Function <a class="header-anchor" href="#replacing-an-nsh-built-in-function" aria-label="Permalink to &quot;Replacing an NSH Built-In Function&quot;">​</a></h2><p>Files can be executed by <code>NSH</code> from the command line by simply typing the name of the ELF program. This requires:</p><ol><li>That the feature be enabled with<code>CONFIG_NSH_FILE_APP=y</code></li><li>That support for the PATH variable is enabled (<code>CONFIG_BINFMT_EXEPATH=y</code> and <code>CONFIG_PATH_INITIAL</code> set to the mount point of the file system that may contain ELF programs).</li></ol><p>Suppose, for example, I have a built-in application called <code>hello</code>. Before installing the new replacement <code>hello</code> ELF program in the file system, this is the version of <code>hello</code> that <code>NSH</code> will execute:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nsh&gt; hello</span></span>
<span class="line"><span>Hello, World!</span></span>
<span class="line"><span>nsh&gt;</span></span></code></pre></div><p>In the above configuration, <code>NSH</code> will first attempt to run the program called <code>hello</code> from the file system. This will fail because we have not yet placed our custom <code>hello</code> ELF program in the file system. So instead, <code>NSH</code> will fall back and execute the built-in application called <code>hello</code>.</p><p>In this way, any command known to <code>NSH</code> can be replaced by an ELF program installed in a mounted file system directory that is found via the PATH variable.</p><p>Now suppose that we do add our custom <code>hello</code> to the file system. When <code>NSH</code> attempts to run the program called <code>hello</code> from the file system, it will run successfully. The built-in version will be ignored. It has been replaced with the version in the file system:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nsh&gt; mount -t vfat /dev/mmcsd0 /bin</span></span>
<span class="line"><span>nsh&gt; hello</span></span>
<span class="line"><span>Hello from Add-On Program!</span></span>
<span class="line"><span>nsh&gt;</span></span></code></pre></div><h2 id="version-dependency" tabindex="-1">Version Dependency <a class="header-anchor" href="#version-dependency" aria-label="Permalink to &quot;Version Dependency&quot;">​</a></h2><p>Note</p><p>This technique generates ELF programs using fixed addresses from the <code>System.map</code> file of a versioned release. The generated ELF programs can only be used with that specific firmware version. A crash will most likely result if used with a different firmware version, because the addresses from the <code>System.map</code> will not match the addresses in a different version of the firmware.</p><p>The alternative approach using [[Symbol Table](\`Symbol Table.md)s &lt;fully_linked_elf&gt;]{.title-ref} is more or less version independent.</p><h2 id="tightly-coupled-memories" tabindex="-1">Tightly Coupled Memories <a class="header-anchor" href="#tightly-coupled-memories" aria-label="Permalink to &quot;Tightly Coupled Memories&quot;">​</a></h2><p>Most MCUs based on ARMv7-M family processors support some kind of Tightly Coupled Memory (TCM). These TCMs have somewhat different properties for specialized operations. Depending on the bus matrix of the processor, you may not be able to execute programs from TCM. For instance, the <code>STM32 F4</code> supports Core Coupled Memory (CCM), but since it is tied directly to the D-bus, it cannot be used to execute programs! On the other hand, the <code>STM32F3</code> has a CCM that is accessible to both the D-Bus and the I-Bus, in which case it should be possible to execute programs from this TCM.</p><p><img src="`+a+'" alt="image"></p><p><img src="'+n+'" alt="image"></p><p>When ELF programs are loaded into memory, the memory is allocated from the heap via a standard memory allocator. By default with the <code>STM32 F4</code>, the CCM is included in <code>HEAP</code> and will typically be allocated first. If CCM memory is allocated to hold the ELF program, a hard-fault will occur immediately when you try to execute the ELF program in memory.</p><p>Therefore, it is necessary on <code>STM32 F4</code> platforms to include the following configuration setting:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CONFIG_STM32_CCMEXCLUDE=y</span></span></code></pre></div><p>With that setting, the CCM memory will be excluded from the heap, and so will never be allocated for ELF program memory.</p>',87)]))}const f=e(t,[["render",o]]);export{b as __pageData,f as default};
