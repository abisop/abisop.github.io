import{_ as a,c as n,al as e,o as p}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"Custom Apps How-to","description":"","frontmatter":{},"headers":[],"relativePath":"en/guides/customapps.md","filePath":"en/guides/customapps.md"}'),l={name:"en/guides/customapps.md"};function t(o,s,i,c,d,u){return p(),n("div",null,s[0]||(s[0]=[e(`<h1 id="custom-apps-how-to" tabindex="-1">Custom Apps How-to <a class="header-anchor" href="#custom-apps-how-to" aria-label="Permalink to &quot;Custom Apps How-to&quot;">​</a></h1><p>NuttX comes with a large number of Apps but, most likely, you will want to add your own.</p><p>There are various different options for this depending on your requirements.</p><blockquote><ol><li>Replace the apps/ directory completely</li><li>Extend the apps/ directory to include a new custom directory</li><li>Include an additional custom directory outside of the main source trees</li></ol></blockquote><p>The following sections explain these 3 methods using a <code>CustomHello.c</code> app and the directory <code>CustomApps</code> as an example.</p><p>Tip</p><p>If you make errors while setting this up and the build fails, it is most likely you&#39;ll need to run <code>make clean</code> and possibly even <code>make distclean</code> before rebuilding to ensure it works correctly.</p><ol><li>Replace The Apps/ Directory Completely</li></ol><hr><p>The CustomApps directory need only to contain the minimum three files:</p><blockquote><ul><li><code>Makefile</code></li><li><code>Kconfig</code></li><li><code>CustomHello.c</code></li></ul></blockquote><h3 id="_1-1-makefile" tabindex="-1">1.1 Makefile <a class="header-anchor" href="#_1-1-makefile" aria-label="Permalink to &quot;1.1 Makefile&quot;">​</a></h3><p>The custom application directory must include a Makefile to make all of the targets expected by the NuttX build and must generate an archive called libapps.a in the top-level of the custom directory structure.</p><p>The Makefile has just those minimum required targets:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>APPDIR = {shell pwd}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-include (TOPDIR)/Make.defs</span></span>
<span class="line"><span></span></span>
<span class="line"><span># files</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CSRCS = CustomHello.c</span></span>
<span class="line"><span>COBJS = CustomHello.o</span></span>
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
<span class="line"><span>  (call ARCHIVE, libapps.a, (COBJS))</span></span>
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
<span class="line"><span>  (Q) (MKDEP) (ROOTDEPPATH) &quot;(CC)&quot; -- (CFLAGS) -- (SRCS) &gt; Make.dep</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Clean the results of the last build</span></span>
<span class="line"><span></span></span>
<span class="line"><span>clean:</span></span>
<span class="line"><span>  (call CLEAN)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Remove the build context and directory links</span></span>
<span class="line"><span></span></span>
<span class="line"><span>clean_context:</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Restore the directory to its original state</span></span>
<span class="line"><span></span></span>
<span class="line"><span>distclean: clean clean_context</span></span>
<span class="line"><span>  (call DELFILE, Make.dep)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Include dependencies</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-include Make.dep</span></span></code></pre></div></blockquote><h3 id="_1-2-kconfig" tabindex="-1">1.2 Kconfig <a class="header-anchor" href="#_1-2-kconfig" aria-label="Permalink to &quot;1.2 Kconfig&quot;">​</a></h3><p>A Kconfig file must be included but need not be populated with any meaningful options. This is a place where you can add settings to generate customized builds of your custom application and/or choose which of your apps to include.</p><p>In the minimum case, Kconfig is only:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># For a description of the syntax of this configuration file,</span></span>
<span class="line"><span># see the file kconfig-language.txt in the NuttX tools repository.</span></span>
<span class="line"><span>#</span></span></code></pre></div></blockquote><p>but it is more usual to include at least the basic information any NuttX app requires, as well as anything else your app may need:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># For a description of the syntax of this configuration file,</span></span>
<span class="line"><span># see the file kconfig-language.txt in the NuttX tools repository.</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span></span></span>
<span class="line"><span>config CUSTOM_APPS_MY_APP</span></span>
<span class="line"><span>      tristate &quot;My App&quot;</span></span>
<span class="line"><span>      default n</span></span>
<span class="line"><span>      ---help---</span></span>
<span class="line"><span>        Enable My App</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if CUSTOM_APPS_MY_APP</span></span>
<span class="line"><span></span></span>
<span class="line"><span>config CUSTOM_APPS_MY_APP_PROGNAME</span></span>
<span class="line"><span>    string &quot;Program name&quot;</span></span>
<span class="line"><span>    default &quot;myapp&quot;</span></span>
<span class="line"><span>    ---help---</span></span>
<span class="line"><span>          This is the name of the program that will be used when the NSH ELF</span></span>
<span class="line"><span>          program is installed.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>config CUSTOM_APPS_MY_APP_PRIORITY</span></span>
<span class="line"><span>    int &quot;My App task priority&quot;</span></span>
<span class="line"><span>    default 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>config CUSTOM_APPS_MY_APP_STACKSIZE</span></span>
<span class="line"><span>    int &quot;My App stack size&quot;</span></span>
<span class="line"><span>    default DEFAULT_TASK_STACKSIZE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>endif</span></span></code></pre></div></blockquote><h3 id="_1-3-customhello-c" tabindex="-1">1.3 CustomHello.c <a class="header-anchor" href="#_1-3-customhello-c" aria-label="Permalink to &quot;1.3 CustomHello.c&quot;">​</a></h3><p>The custom application must actually compile some source files in order to generate the required libapps.a archive. One of these source files must include the <code>main()</code> entry point to the application.</p><p>The function of this main() entry point simply to bring-up the full application. It is called at the completion of OS initialization.</p><p>What this application initialization entry point does, how it interacts with the rest of your application, and where the rest of you application code is located is of no concern to the OS.</p><p>Only this one entry point is needed.</p><p>For this &quot;Hello, Custom World!&quot; application <code>custom_hello()</code> is the application entry point:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main(int argc, char *argv[])</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  printf(&quot;Hello, Custom World!!\\n&quot;);</span></span>
<span class="line"><span>  return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div></blockquote><h3 id="_1-4-building-with-the-customapps-directory" tabindex="-1">1.4 Building with the CustomApps Directory <a class="header-anchor" href="#_1-4-building-with-the-customapps-directory" aria-label="Permalink to &quot;1.4 Building with the CustomApps Directory&quot;">​</a></h3><p>In order to build with the new custom configuration, you will need the following in your configuration:</p><p><code>CONFIG_APPS_DIR=&quot;../CustomApps&quot;</code>{.interpreted-text role=&quot;menuselection&quot;}</p><p><code>CONFIG_INIT_ENTRYPOINT=&quot;custom_hello_main&quot;</code>{.interpreted-text role=&quot;menuselection&quot;}</p><p>Note that you can only access the <code>../CustomApps/Kconfig</code> configuration file if <code>CONFIG_APPS_DIR</code> is set to <code>../CustomApps</code> BEFORE <code>make menuconfig</code> is executed</p><p>This can be done by</p><ul><li><p>hand-editing the .config file before running make menuconfig, which is rarely a good idea</p></li><li><p>Using <code>kconfig-tweak --set-str CONFIG_APPS_DIR ../CustomApps</code></p></li><li><p>select the CustomApps directory as a command line option at the time the board is configured:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./tools/configure.sh -a ../CustomApps &lt;board&gt;:&lt;config&gt;</span></span></code></pre></div></blockquote><p>or</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.tools/configure.sh -l ../CustomBoards/MyCustomBoardName/MyCustomConfig</span></span></code></pre></div></blockquote></li></ul><p>Then build as you normally would. When you execute the custom_hello app you should see:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hello, Custom World!!</span></span></code></pre></div></blockquote><ol start="2"><li>Extend the apps/ directory to include a new custom directory</li></ol><hr><p>The collection of apps provided in nuttx-apps can be useful, and this method simply extends the directory structure to include your own directory structure.</p><p>The existing /apps makefile automatically checks for the existence of sub-directories that contain a <code>Makefile</code> and <code>Make.defs</code> file. This example assumes there is likely to be more than one custom app, and includes a <code>Kconfig</code> for the app itself. Inclusion of a <code>Kconfig</code> allows custom App options to be included in the NuttX configuration system, but is optional.</p><h3 id="_2-1-custom-apps-directory" tabindex="-1">2.1 Custom Apps Directory <a class="header-anchor" href="#_2-1-custom-apps-directory" aria-label="Permalink to &quot;2.1 Custom Apps Directory&quot;">​</a></h3><p>Simply create a new directory under the existing apps directory with a name of your choice. This example uses the directory name <code>CustomApps</code>.</p><h3 id="_2-2-make-defs" tabindex="-1">2.2 Make.defs <a class="header-anchor" href="#_2-2-make-defs" aria-label="Permalink to &quot;2.2 Make.defs&quot;">​</a></h3><p>Create this file in the <code>CustomApps</code> directory, with the following line added:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>include (wildcard (APPDIR)/CustomApps/*/Make.defs)</span></span></code></pre></div></blockquote><h3 id="_2-3-makefile" tabindex="-1">2.3 Makefile <a class="header-anchor" href="#_2-3-makefile" aria-label="Permalink to &quot;2.3 Makefile&quot;">​</a></h3><p>Create a Makefile in the <code>CustomApps</code> directory, with the following lines added:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>MENUDESC = &quot;Custom Apps&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>include (APPDIR)/Directory.mk</span></span></code></pre></div></blockquote><h3 id="_2-4-customhello-app" tabindex="-1">2.4 CustomHello App <a class="header-anchor" href="#_2-4-customhello-app" aria-label="Permalink to &quot;2.4 CustomHello App&quot;">​</a></h3><p>Create a sub-directory under the <code>CustomApps</code> directory called <code>CustomHello</code>.</p><p>The same <code>CustomHello.c</code> file as described above should be created here.</p><h3 id="_2-5-customhello-make-defs" tabindex="-1">2.5 CustomHello Make.defs <a class="header-anchor" href="#_2-5-customhello-make-defs" aria-label="Permalink to &quot;2.5 CustomHello Make.defs&quot;">​</a></h3><p>Create a Make.defs in the <code>CustomApps/CustomHello</code> directory with the following lines:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ifneq ((CONFIG_CUSTOM_APPS_CUSTOM_HELLO),)</span></span>
<span class="line"><span>CONFIGURED_APPS += (APPDIR)/CustomApps/CustomHello</span></span>
<span class="line"><span>endif</span></span></code></pre></div></blockquote><h3 id="_2-6-customhello-makefile" tabindex="-1">2.6 CustomHello Makefile <a class="header-anchor" href="#_2-6-customhello-makefile" aria-label="Permalink to &quot;2.6 CustomHello Makefile&quot;">​</a></h3><p>Create a Makefile in the <code>CustomApps/CustomHello</code> directory with the following lines:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>include (APPDIR)/Make.defs</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Custom Hello built-in application info</span></span>
<span class="line"><span></span></span>
<span class="line"><span>PROGNAME = (CONFIG_CUSTOM_APPS_CUSTOM_HELLO_PROGNAME)</span></span>
<span class="line"><span>PRIORITY = (CONFIG_CUSTOM_APPS_CUSTOM_HELLO_PRIORITY)</span></span>
<span class="line"><span>STACKSIZE = (CONFIG_CUSTOM_APPS_CUSTOM_HELLO_STACKSIZE)</span></span>
<span class="line"><span>MODULE = (CONFIG_CUSTOM_APPS_CUSTOM_HELLO)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Custom Hello</span></span>
<span class="line"><span></span></span>
<span class="line"><span>MAINSRC = CustomHello.c</span></span>
<span class="line"><span></span></span>
<span class="line"><span>include (APPDIR)/Application.mk</span></span></code></pre></div></blockquote><h3 id="_2-7-customhello-kconfig" tabindex="-1">2.7 CustomHello Kconfig <a class="header-anchor" href="#_2-7-customhello-kconfig" aria-label="Permalink to &quot;2.7 CustomHello Kconfig&quot;">​</a></h3><p>Create a Kconfig file in the <code>CustomApps/CustomHello</code> directory, with the following lines. For the purposes of this example, the Kconfig will only cover our single application):</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#</span></span>
<span class="line"><span># For a description of the syntax of this configuration file,</span></span>
<span class="line"><span># see the file kconfig-language.txt in the NuttX tools repository.</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span></span></span>
<span class="line"><span>config CUSTOM_APPS_CUSTOM_HELLO</span></span>
<span class="line"><span>    tristate &quot;Custom Hello App&quot;</span></span>
<span class="line"><span>    default n</span></span>
<span class="line"><span>    ---help---</span></span>
<span class="line"><span>        Enable the Custom Hello App</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if CUSTOM_APPS_CUSTOM_HELLO</span></span>
<span class="line"><span></span></span>
<span class="line"><span>config CUSTOM_APPS_CUSTOM_HELLO_PROGNAME</span></span>
<span class="line"><span>    string &quot;Program name&quot;</span></span>
<span class="line"><span>    default &quot;custom_hello&quot;</span></span>
<span class="line"><span>    ---help---</span></span>
<span class="line"><span>        This is the name of the program that will be used when the NSH ELF</span></span>
<span class="line"><span>        program is installed.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>config CUSTOM_APPS_CUSTOM_HELLO_PRIORITY</span></span>
<span class="line"><span>    int &quot;Custom Hello task priority&quot;</span></span>
<span class="line"><span>    default 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>config CUSTOM_APPS_CUSTOM_HELLO_STACKSIZE</span></span>
<span class="line"><span>    int &quot;Custom Hello stack size&quot;</span></span>
<span class="line"><span>    default DEFAULT_TASK_STACKSIZE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>endif</span></span></code></pre></div></blockquote><h3 id="_2-8-build-and-run" tabindex="-1">2.8 Build and Run <a class="header-anchor" href="#_2-8-build-and-run" aria-label="Permalink to &quot;2.8 Build and Run&quot;">​</a></h3><p>Once these files have been created, run a <code>make clean</code> (you may need to run <code>make distclean</code> followed by <code>make menuconfig</code>. If successful there will be new Kconfig entries.</p><p><code>Application Configuraration --&gt; Custom Apps --&gt; Custom Hello App</code>{.interpreted-text role=&quot;menuselection&quot;}</p><p>Select the <code>Custom Hello App</code> and run the usual build process. If successful you can run the newly included <code>custom_hello</code> app.</p><ol start="3"><li>Include an Additional Custom directory Outside of the Main Source Trees</li></ol><hr><p>Thia is similar to the previous approach, but places the <code>CustomApps</code> directory outside of the default trees.</p><h3 id="_3-1-create-custom-apps-directory-and-a-symbolic-link" tabindex="-1">3.1 Create Custom Apps directory and a Symbolic Link <a class="header-anchor" href="#_3-1-create-custom-apps-directory-and-a-symbolic-link" aria-label="Permalink to &quot;3.1 Create Custom Apps directory and a Symbolic Link&quot;">​</a></h3><p>Create a directory for the custom apps in a location of your choosing. Then create A symbolic link in the main nuttx/apps directory.</p><p>This example assumes this has been placed below the top NuttX folder, alongside the default <code>apps</code> directory, i.e. <code>nuttx/CustomApps</code></p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> pwd</span></span>
<span class="line"><span>/home/nuttx</span></span>
<span class="line"><span> ls -1</span></span>
<span class="line"><span>apps</span></span>
<span class="line"><span>CustomBoards</span></span>
<span class="line"><span>nuttx</span></span>
<span class="line"><span> mkdir CustomApps</span></span>
<span class="line"><span> ls -1</span></span>
<span class="line"><span>apps</span></span>
<span class="line"><span>CustomApps</span></span>
<span class="line"><span>CustomBoards</span></span>
<span class="line"><span>nuttx</span></span>
<span class="line"><span> cd apps</span></span>
<span class="line"><span> ln -s ../CustomApps CustomApps</span></span></code></pre></div></blockquote><h3 id="_3-2-make-defs-etc" tabindex="-1">3.2 Make.defs etc. <a class="header-anchor" href="#_3-2-make-defs-etc" aria-label="Permalink to &quot;3.2 Make.defs etc.&quot;">​</a></h3><p>Follow all the steps as in sections 2.2 to 2.7 above, creating the exact same files but placing then in the new <code>CustomApps</code> directory location created as described here.</p>`,74)]))}const m=a(l,[["render",t]]);export{h as __pageData,m as default};
