import{_ as s,c as a,al as e,o as i}from"./chunks/framework.NFAqBSgQ.js";const f=JSON.parse('{"title":"inifile INI File Parser","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/fsutils/inifile/index.md","filePath":"en/applications/fsutils/inifile/index.md"}'),t={name:"en/applications/fsutils/inifile/index.md"};function p(o,n,l,r,u,c){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="inifile-ini-file-parser" tabindex="-1"><code>inifile</code> INI File Parser <a class="header-anchor" href="#inifile-ini-file-parser" aria-label="Permalink to &quot;\`inifile\` INI File Parser&quot;">​</a></h1><h2 id="syntax" tabindex="-1">Syntax <a class="header-anchor" href="#syntax" aria-label="Permalink to &quot;Syntax&quot;">​</a></h2><p>This directory contains a very simple INI file parser. An INI file consists of a sequence of lines up to the end of file. A line may be one of the following:</p><ol><li><p>A blank line.</p></li><li><p>A comment line. Any line beginning with <code>;</code></p></li><li><p>A section header. Definitions are divided into sections. Each section begins with a line containing the section name enclosed in square brackets. For example, <code>[section1]</code>. The left bracket must be the first character on the line. Section names are case insensitive, i.e., <code>SECTION1</code> and <code>Section1</code> refer to the same section.</p></li><li><p>Variable assignments. A variable assignment is a variable name followed by the <code>=</code> sign and then the value of the variable. For example, <code>A=B</code>: <code>A</code> is the variable name; <code>B</code> is the variable value. All variables following the section header belong in the section.</p><p>Variable names may be preceded with white space. Whitespace is not permitted before the <code>=</code> sign. Variable names are case insensitive, i.e., <code>A</code> and <code>a</code> refer to the same variable name.</p><p>Variable values may be numeric (any base) or a string. The case of string arguments is preserved.</p></li></ol><h2 id="programming-interfaces" tabindex="-1">Programming Interfaces <a class="header-anchor" href="#programming-interfaces" aria-label="Permalink to &quot;Programming Interfaces&quot;">​</a></h2><p>See <code>apps/include/fsutils/inifile.h</code> for interfaces supported by the INI file parser.</p><p>## Test Program</p><p>Below is a simple test program:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(int argc, char *argv[])</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    INIHANDLE handle;</span></span>
<span class="line"><span>    FILE *stream;</span></span>
<span class="line"><span>    FAR char *ptr;</span></span>
<span class="line"><span>    long value;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    stream = fopen(&quot;/tmp/file.ini&quot;, &quot;w&quot;);</span></span>
<span class="line"><span>    fprintf(stream, &quot;; Test INI file\\n&quot;);</span></span>
<span class="line"><span>    fprintf(stream, &quot;[section1]\\n&quot;);</span></span>
<span class="line"><span>    fprintf(stream, &quot;  VAR1=1\\n&quot;);</span></span>
<span class="line"><span>    fprintf(stream, &quot;  VAR2=2\\n&quot;);</span></span>
<span class="line"><span>    fprintf(stream, &quot;  VAR3=3\\n&quot;);</span></span>
<span class="line"><span>    fprintf(stream, &quot;\\n&quot;);</span></span>
<span class="line"><span>    fprintf(stream, &quot;[section2]\\n&quot;);</span></span>
<span class="line"><span>    fprintf(stream, &quot;  VAR4=4\\n&quot;);</span></span>
<span class="line"><span>    fprintf(stream, &quot;  VAR5=5\\n&quot;);</span></span>
<span class="line"><span>    fprintf(stream,   &quot;VAR6=6\\n&quot;);</span></span>
<span class="line"><span>    fprintf(stream, &quot;\\n&quot;);</span></span>
<span class="line"><span>    fclose(stream);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    handle = inifile_initialize(&quot;/tmp/file.ini&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ptr = inifile_read_string(handle, &quot;section2&quot;, &quot;VAR5&quot;, &quot;OOPS&quot;);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s String: %s\\n&quot;, &quot;section2&quot;, &quot;VAR5&quot;, ptr);</span></span>
<span class="line"><span>    inifile_free_string(ptr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ptr = inifile_read_string(handle, &quot;section1&quot;, &quot;VAR2&quot;, &quot;OOPS&quot;);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s String: %s\\n&quot;, &quot;section1&quot;, &quot;VAR2&quot;, ptr);</span></span>
<span class="line"><span>    inifile_free_string(ptr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ptr = inifile_read_string(handle, &quot;section3&quot;, &quot;VAR3&quot;, &quot;OOPS&quot;);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s String: %s\\n&quot;, &quot;section3&quot;, &quot;VAR3&quot;, ptr);</span></span>
<span class="line"><span>    inifile_free_string(ptr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ptr = inifile_read_string(handle, &quot;section1&quot;, &quot;VAR3&quot;, &quot;OOPS&quot;);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s String: %s\\n&quot;, &quot;section1&quot;, &quot;VAR3&quot;, ptr);</span></span>
<span class="line"><span>    inifile_free_string(ptr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ptr = inifile_read_string(handle, &quot;section1&quot;, &quot;VAR1&quot;, &quot;OOPS&quot;);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s String: %s\\n&quot;, &quot;section1&quot;, &quot;VAR1&quot;, ptr);</span></span>
<span class="line"><span>    inifile_free_string(ptr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ptr = inifile_read_string(handle, &quot;section1&quot;, &quot;VAR42&quot;, &quot;OOPS&quot;);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s String: %s\\n&quot;, &quot;section1&quot;, &quot;VAR42&quot;, ptr);</span></span>
<span class="line"><span>    inifile_free_string(ptr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ptr = inifile_read_string(handle, &quot;section2&quot;, &quot;VAR6&quot;, &quot;OOPS&quot;);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s String: %s\\n&quot;, &quot;section2&quot;, &quot;VAR6&quot;, ptr);</span></span>
<span class="line"><span>    inifile_free_string(ptr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ptr = inifile_read_string(handle, &quot;section2&quot;, &quot;VAR4&quot;, &quot;OOPS&quot;);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s String: %s\\n&quot;, &quot;section2&quot;, &quot;VAR4&quot;, ptr);</span></span>
<span class="line"><span>    inifile_free_string(ptr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    value = inifile_read_integer(handle, &quot;section1&quot;, &quot;VAR3&quot;, 0);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s Value: %ld\\n&quot;, &quot;section1&quot;, &quot;VAR3&quot;, value);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    value = inifile_read_integer(handle, &quot;section3&quot;, &quot;VAR3&quot;, 0);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s String: %ld\\n&quot;, &quot;section3&quot;, &quot;VAR3&quot;, value);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    value = inifile_read_integer(handle, &quot;section1&quot;, &quot;VAR1&quot;, 0);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s Value: %ld\\n&quot;, &quot;section1&quot;, &quot;VAR1&quot;, value);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    value = inifile_read_integer(handle, &quot;section2&quot;, &quot;VAR5&quot;, 0);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s Value: %ld\\n&quot;, &quot;section2&quot;, &quot;VAR5&quot;, value);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    value = inifile_read_integer(handle, &quot;section2&quot;, &quot;VAR6&quot;, 0);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s Value: %ld\\n&quot;, &quot;section2&quot;, &quot;VAR6&quot;, value);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    value = inifile_read_integer(handle, &quot;section1&quot;, &quot;VAR42&quot;, 0);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s String: %ld\\n&quot;, &quot;section1&quot;, &quot;VAR42&quot;, value);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    value = inifile_read_integer(handle, &quot;section1&quot;, &quot;VAR2&quot;, 0);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s Value: %ld\\n&quot;, &quot;section1&quot;, &quot;VAR2&quot;, value);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    value = inifile_read_integer(handle, &quot;section2&quot;, &quot;VAR4&quot;, 0);</span></span>
<span class="line"><span>    printf(&quot;Section: %s Variable: %s Value: %ld\\n&quot;, &quot;section2&quot;, &quot;VAR4&quot;, value);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    inifile_uninitialize(handle);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>Test program output:</p><pre><code>Section: section2 Variable: VAR5 String: 5
Section: section1 Variable: VAR2 String: 2
Section: section3 Variable: VAR3 String: OOPS
Section: section1 Variable: VAR3 String: 3
Section: section1 Variable: VAR1 String: 1
Section: section1 Variable: VAR42 String: OOPS
Section: section2 Variable: VAR6 String: 6
Section: section2 Variable: VAR4 String: 4

Section: section1 Variable: VAR3 Value: 3
Section: section3 Variable: VAR3 Value: 0
Section: section1 Variable: VAR1 Value: 1
Section: section2 Variable: VAR5 Value: 5
Section: section2 Variable: VAR6 Value: 6
Section: section1 Variable: VAR42 String: 0
Section: section1 Variable: VAR2 Value: 2
Section: section2 Variable: VAR4 Value: 4
</code></pre>`,11)]))}const d=s(t,[["render",p]]);export{f as __pageData,d as default};
