import{_ as n,c as s,al as e,o as p}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"Custom Application Directories","description":"","frontmatter":{},"headers":[],"relativePath":"en/guides/custom_app_directories.md","filePath":"en/guides/custom_app_directories.md"}'),i={name:"en/guides/custom_app_directories.md"};function t(l,a,o,c,r,d){return p(),s("div",null,a[0]||(a[0]=[e(`<h1 id="custom-application-directories" tabindex="-1">Custom Application Directories <a class="header-anchor" href="#custom-application-directories" aria-label="Permalink to &quot;Custom Application Directories&quot;">​</a></h1><p>Warning</p><p>Migrated from: <a href="https://cwiki.apache.org/confluence/display/NUTTX/Custom+Application+Directories" target="_blank" rel="noreferrer">https://cwiki.apache.org/confluence/display/NUTTX/Custom+Application+Directories</a></p><p>Most people use the generic <code>apps/</code> directory with NuttX. That is convenient and well-documented. However, it should always be remembered that NuttX is a stand-alone, general-purpose OS and has <strong>no dependency</strong> on that &quot;canned&quot; application directory.</p><p>This page shows how to create your own, custom application directory from scratch.</p><h2 id="creating-the-custom-application-directory" tabindex="-1">Creating the Custom Application Directory <a class="header-anchor" href="#creating-the-custom-application-directory" aria-label="Permalink to &quot;Creating the Custom Application Directory&quot;">​</a></h2><p>Below is a simple example of the <strong>minimum</strong> custom application directory. It contains only three files: <code>Makefile</code>, <code>Kconfig</code>, and <code>hello.c</code>.</p><h3 id="makefile" tabindex="-1">Makefile <a class="header-anchor" href="#makefile" aria-label="Permalink to &quot;Makefile&quot;">​</a></h3><p>The custom application directory must include a <code>Makefile</code> that supports all of the make targets expected by the NuttX build system <strong>and</strong> must generate an archive called <code>libapps.a</code> in the top-level of the custom directory structure. The minimal required targets for the <code>Makefile</code> look like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>APPDIR = {shell pwd}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-include (TOPDIR)/Make.defs</span></span>
<span class="line"><span></span></span>
<span class="line"><span># files</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CSRCS = hello.c</span></span>
<span class="line"><span>COBJS = hello.o</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ROOTDEPPATH = --dep-path .</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Build targets</span></span>
<span class="line"><span></span></span>
<span class="line"><span>all: libapps.a</span></span>
<span class="line"><span>.PHONY: dirlinks context preconfig depend clean clean_context distclean</span></span>
<span class="line"><span>.PRECIOUS: libapps(LIBEXT)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Compile C Files</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(COBJS): %(OBJEXT): %.c</span></span>
<span class="line"><span>(call COMPILE, &lt;, @)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Add object files to the apps archive</span></span>
<span class="line"><span></span></span>
<span class="line"><span>libapps.a: (COBJS)</span></span>
<span class="line"><span>(call ARCHIVE, libapps.a, (COBJS))</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Create directory links</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dirlinks:</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Setup any special pre-build context</span></span>
<span class="line"><span></span></span>
<span class="line"><span>context:</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Setup any special pre-configuration context</span></span>
<span class="line"><span></span></span>
<span class="line"><span>preconfig:</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Make the dependency file, Make.deps</span></span>
<span class="line"><span></span></span>
<span class="line"><span>depend: Makefile (CSRCS)</span></span>
<span class="line"><span>(Q) (MKDEP) (ROOTDEPPATH) &quot;(CC)&quot; -- (CFLAGS) -- (SRCS) &gt;Make.dep</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Clean the results of the last build</span></span>
<span class="line"><span></span></span>
<span class="line"><span>clean:</span></span>
<span class="line"><span>(call CLEAN)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Remove the build context and directory links</span></span>
<span class="line"><span></span></span>
<span class="line"><span>clean_context:</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Restore the directory to its original state</span></span>
<span class="line"><span></span></span>
<span class="line"><span>distclean: clean clean_context</span></span>
<span class="line"><span>(call DELFILE, Make.dep)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Include dependencies</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-include Make.dep</span></span></code></pre></div><h3 id="kconfig" tabindex="-1">Kconfig <a class="header-anchor" href="#kconfig" aria-label="Permalink to &quot;Kconfig&quot;">​</a></h3><p>A <code>Kconfig</code> file must be included, but it need not contain any meaningful configuration options. This file is where you can add application-specific configuration settings if desired. The minimal <code>Kconfig</code> might look like:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># For a description of the syntax of this configuration file,</span></span>
<span class="line"><span># see the file kconfig-language.txt in the NuttX tools repository.</span></span>
<span class="line"><span>#</span></span></code></pre></div><h3 id="hello-c" tabindex="-1">hello.c <a class="header-anchor" href="#hello-c" aria-label="Permalink to &quot;hello.c&quot;">​</a></h3><p>Your custom application must compile at least one source file to generate the required <code>libapps.a</code> archive. One of these source files must include the <code>main()</code> entry point to the application. That main function (or similarly named entry point) is called after OS initialization completes.</p><p>What this application initialization entry point does, how it interacts with the rest of your application, and where the rest of you application code is located is of no concern to the OS. Only this one entry point is needed.</p><p>Below is a small &quot;Hello, World!&quot; example, where <code>custom_main()</code> is the application entry point:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int custom_main(int argc, char *argv[])</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>printf(&quot;Hello, World!!\\n&quot;);</span></span>
<span class="line"><span>return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="building-with-the-custom-application-directory" tabindex="-1">Building with the Custom Application Directory <a class="header-anchor" href="#building-with-the-custom-application-directory" aria-label="Permalink to &quot;Building with the Custom Application Directory&quot;">​</a></h2><p>In order to build with the new custom application directory, you need the following in your NuttX configuration:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CONFIG_APPS_DIR=&quot;../custom-apps&quot;</span></span>
<span class="line"><span>CONFIG_USER_ENTRYPOINT=&quot;custom_main&quot;</span></span></code></pre></div><p>Note</p><p>You can only access the <code>../custom-apps/Kconfig</code> file if <code>CONFIG_APPS_DIR</code> is set to <code>../custom-apps</code> <strong>before</strong> running <code>make menuconfig</code>. If you start with an existing configuration, you may face a &quot;chicken-and-egg&quot; situation. One workaround is to manually edit the <code>.config</code> file before running <code>make menuconfig</code>.</p><p>Alternatively, if you use the <code>tools/configure.sh</code> script, you can specify the custom-apps directory from the command line:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tools/configure.sh -a ../custom_apps &lt;board&gt;:&lt;config&gt;</span></span></code></pre></div><p>Afterward, just build NuttX as you normally would. When you run the program that was built with your custom application directory, you should see:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hello, World!!</span></span></code></pre></div>`,27)]))}const g=n(i,[["render",t]]);export{h as __pageData,g as default};
