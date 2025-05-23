import{_ as s,c as a,al as e,o as i}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"C Coding Standard","description":"","frontmatter":{},"headers":[],"relativePath":"en/contributing/coding_style.md","filePath":"en/contributing/coding_style.md"}'),t={name:"en/contributing/coding_style.md"};function p(l,n,o,c,r,d){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="c-coding-standard" tabindex="-1">C Coding Standard <a class="header-anchor" href="#c-coding-standard" aria-label="Permalink to &quot;C Coding Standard&quot;">​</a></h1><p>NuttX follows a specific coding style which needs to be followed at all times a contribution to be accepted. Please read this document before working on new code so that you can follow the style from the start. To check your code for conformance to the coding style, you should use the checkpatch.sh script (that calls the <a href="#nxstyle">nxstyle</a> tool) included under <code>tools/</code> in the main NuttX repository, or enable the pre-commit functionality described in <a href="#precommit">pre-commit</a>.</p><h2 id="quick-check-for-compliance" tabindex="-1">Quick Check for Compliance <a class="header-anchor" href="#quick-check-for-compliance" aria-label="Permalink to &quot;Quick Check for Compliance&quot;">​</a></h2><p>You should check for coding style issues before submitting your Pull Request. There is a script that you can run to check for coding styles issue:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./tools/checkpatch.sh -g HEAD~...HEAD</span></span></code></pre></div></blockquote><p>Alternatevily you can run this script passing the .c file or .h header you want to check:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./tools/checkpatch.sh -f path/to/your/file.c</span></span></code></pre></div></blockquote><h2 id="general-conventions" tabindex="-1">General Conventions <a class="header-anchor" href="#general-conventions" aria-label="Permalink to &quot;General Conventions&quot;">​</a></h2><h3 id="file-organization" tabindex="-1">File Organization <a class="header-anchor" href="#file-organization" aria-label="Permalink to &quot;File Organization&quot;">​</a></h3><p><strong>File Extensions</strong> Use the <code>.h</code> extension for C header files and <code>.c</code> for C source files.</p><p><strong>File header</strong>. Every C, C++, make file, or script begins with a file header. That file header is enclosed with a <em>block comment</em> (see below). Within the block comment, the following must appear:</p><blockquote><ul><li>The relative path to the file from the top-level directory.</li><li>An optional, one-line description of the file contents.</li><li>A blank line</li><li>NuttX standard Apache 2.0 licensing information as provided in the <a href="#appndxa">appendix</a>.</li></ul></blockquote><p><strong>Sample File Headers</strong>. Sample file headers are provided in an <a href="#appndxa">Appendix</a> to this document. No new software may be included in the NuttX source tree that does not have licensing information included in the file. No new software may be included in the NuttX source tree that does not have a Apache 2.0 license or license (or, in the case of 3rd party file, a compatible license such as the BSD or MIT licenses). If the file does not follow Apache 2.0 licensing, then the appropriate license information should be provided in the header rather than the Apache 2.0 licensing information and a NOTE should be included in the top-level <code>LICENSE</code> and/or <code>NOTICE</code> file(s), as appropriate, to indicate any variations from Apache 2.0 licensing.</p><p><strong>Grouping</strong>. All like components in a C source or header file are grouped together. Definitions do not appear arbitrarily through the file, rather, like definitions are grouped together and preceded by a <em>block comment</em> identifying the grouping.</p><p><strong>Block Comments</strong>. Each grouping in the file is separated with a <em>block comment</em>. The block comment consists of:</p><ul><li>A line that consists of the opening C comment (<code>/*</code>) followed by a series of asterisks extending to the length of the line (usually to column 78).</li><li>The name of the grouping, starting at column 4. An asterisk preceives the name of the grouping in column 1.</li><li>A line that consists of the closing C comment (<code>*/</code>) at the end of the line (usually column 78) preceded by a series of asterisks extending to column 1.</li></ul><p><strong>Examples of Block Comments</strong>. See <a href="#appndxa">Appendix A</a> for examples of block comments.</p><p><strong>Order of Groupings</strong>. The following groupings should appear in all C source files in the following order:</p><blockquote><ol><li>Included Files</li><li>Pre-processor Definitions</li><li>Private Types (definitions)</li><li>Private Function Prototypes (declarations)</li><li>Private Data (definitions)</li><li>Public Data (definitions)</li><li>Private Functions (definitions)</li><li>Public Functions (definitions)</li></ol></blockquote><p>The following groupings should appear in all C header files in the following order:</p><blockquote><ol><li>Included Files</li><li>Pre-processor Definitions</li><li>Public Types (definitions)</li><li>Public Data (declarations)</li><li>Inline Functions (definitions)</li><li>Public Function Prototypes (declarations)</li></ol></blockquote><p><strong>Large vs. Small Files</strong>. In larger files, block comments should be included for all groupings, even if they are empty; the empty grouping provides important information in itself. Smaller files may omit some of the block comments; it is awkward if the block comments are larger than the file content!</p><p><strong>Header File Idempotence</strong>. C header file must protect against multiple inclusion through the use of macros that &quot;guard&quot; against multiple definitions if the header file is included multiple times.</p><ul><li><p>Each header file must contain the following pre-processor conditional logic near the beginning of the header file: Between the file header and the &quot;Included Files&quot; block comment. For example:</p><pre><code>#ifndef __INCLUDE_NUTTX_ARCH_H
#define __INCLUDE_NUTTX_ARCH_H
</code></pre><p>Notice that the definitions within of the header do not follow the usually rules: The presence of the conditional test at the top of the file does not cause the remaining definitions within the file to be indented.</p></li><li><p>Then conditional compilation is closed at the fine line of the header file with:</p><pre><code>#endif /* __INCLUDE_NUTTX_ARCH_H */
</code></pre></li></ul><p><strong>Forming Guard Names</strong>. Then pre-processor macro name used in the guard is formed from the full, relative path to the header for from the top-level, controlled directory. That path is preceded by <code>__</code> and <code>_</code> replaces each character that would otherwise be invalid in a macro name. So, for example, <code>__INCLUDE_NUTTX_ARCH_H</code> corresponds to the header file <code>include/nuttx/arch.h</code></p><p><strong>Deoxygen Information</strong>. NuttX does not use Deoxygen for documentation and no file should contain Doxygen tags or Doxygen style comments.</p><p><strong>Sample File Formats</strong>. C source and header file templates are provided in an <a href="#appndxa">Appendix</a> to this document.</p><h3 id="lines" tabindex="-1">Lines <a class="header-anchor" href="#lines" aria-label="Permalink to &quot;Lines&quot;">​</a></h3><p><strong>Line Endings</strong>. Files should be formatted with the newline character (<code>\\n</code>) as the line ending (Unix-style line endings) and specifically <em>not</em> the carriage return, newline sequence (<code>\\r\\n</code>) used with Windows-style line endings. There should be no extra whitespace at the end of the line. In addition, all text files should end in a single newline (<code>\\n</code>). This avoids the <em>&quot;No newline at end of file&quot;</em> warning generated by certain tools.</p><p><strong>Line Width</strong>. Text should not extend past column 78 in the typical C source or header file. Sometimes the nature of the content of a file may require that the lines exceed this limit. This often occurs in header files with naturally long definitions. If the line width must extend 78 lines, then some wider line width may be used in the file provided that it is used consistently.</p><p><strong>Line Wrapping</strong>.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct some_long_struct_name_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  struct some_long_struct_name_s *flink;  /* The forward link to the next instance of struct some_long_struct_name_s in a singly linked list */</span></span>
<span class="line"><span>  int short_name1;   /* Short comment 1 */</span></span>
<span class="line"><span>  int short_name2;   /* This is a very long comment describing subtle aspects of the short_name2 field */</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct some_medium_name_s *ptr = malloc(sizeof(some_medium_name_s);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct some_long_struct_name_s *ptr = malloc(sizeof(some_long_struct_name_s);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = some_function_with_many parameters(long_parameter_name_1, long_parameter_name_2, long_parameter_name_3, long_parameter_name_4, long_parameter_name_5, long_parameter_name_6, long_parameter_name_7, long_parameter_name_8);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = some_function_with_many parameters(long_parameter_name_1,</span></span>
<span class="line"><span>  long_parameter_name_2,</span></span>
<span class="line"><span>  long_parameter_name_3</span></span>
<span class="line"><span>  long_parameter_name_4,</span></span>
<span class="line"><span>  long_parameter_name_5,</span></span>
<span class="line"><span>  long_parameter_name_6,</span></span>
<span class="line"><span>  long_parameter_name_7,</span></span>
<span class="line"><span>  long_parameter_name_8);</span></span></code></pre></div><p>Hint</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct some_long_struct_name_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  /* The forward link to the next instance of struct</span></span>
<span class="line"><span>   * some_long_struct_name_s in a singly linked list.</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  struct some_long_struct_name_s *flink;</span></span>
<span class="line"><span>  int short_name1;   /* Short comment 1. */</span></span>
<span class="line"><span>  int short_name2;   /* This is a very long comment describing subtle</span></span>
<span class="line"><span>                      * aspects of the short_name2 field. */</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>FAR struct some_medium_name_s *ptr = malloc(sizeof(some_medium_name_s);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>FAR struct some_medium_name_s *ptr = malloc(sizeof(some_medium_name_s);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>FAR struct some_long_struct_name_s *ptr = malloc(sizeof(some_long_struct_name_s);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ret = some_function_with_many parameters(long_parameter_name_1,</span></span>
<span class="line"><span>                                         long_parameter_name_2,</span></span>
<span class="line"><span>                                         long_parameter_name_3,</span></span>
<span class="line"><span>                                         long_parameter_name_4,</span></span>
<span class="line"><span>                                         long_parameter_name_5,</span></span>
<span class="line"><span>                                         long_parameter_name_6,</span></span>
<span class="line"><span>                                         long_parameter_name_7,</span></span>
<span class="line"><span>                                         long_parameter_name_8);</span></span></code></pre></div><p><strong>NOTE</strong>: See the discussion of <a href="#farnear">pointers</a> for information about the <code>FAR</code> qualifier used above.</p><p><strong>Double Spacing</strong>. A single blank line may be use to separate logical groupings as the designer feels fit. Single blank lines are also required in certain contexts as defined in this standard. Additional blanks lines (two or more) are prohibited.</p><p><strong>Columnar Organization</strong>. Similar things should be aligned on the same column unless doing so would cause the line width to be exceeded.</p><p>Note</p><p>This is acceptable</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dog = cat;</span></span>
<span class="line"><span>monkey = oxen;</span></span>
<span class="line"><span>aardvark = macaque;</span></span></code></pre></div><p>Hint</p><p>This is preferred</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dog      = cat;</span></span>
<span class="line"><span>monkey   = oxen;</span></span>
<span class="line"><span>aardvark = macaque;</span></span></code></pre></div><p><strong>Block Comments</strong> The final asterisk (<code>*</code>) should occur at column 78 (or the line width of files with longer lines). Note that the final comment delimiter of the block comment is an exception an lies at column 79.</p><h3 id="comments" tabindex="-1">Comments <a class="header-anchor" href="#comments" aria-label="Permalink to &quot;Comments&quot;">​</a></h3><p><strong>General</strong>. Within a comment, the text must be standard English conforming to standard English rules of grammar and spelling (US English spelling). Of course, this is not the place to summarize all English grammar, but as examples of common grammatic issues in comments:</p><ul><li>All sentences should begin with an upper-case character and end with either &#39;.&#39;, &#39;?&#39;, or &#39;!&#39;.</li><li>Sentence fragments and phrases are generally treated the same as sentences.</li><li>The punctuation &#39;.&#39; and &#39;:&#39; is followed by two spaces; the punctuation &#39;,&#39; and &#39;;&#39; is followed by a single space.</li><li>Text following &#39;.&#39; or &#39;:&#39; begins with an upper-case character; text following &#39;,&#39; or &#39;;&#39; begins with a lower-case character.</li></ul><p><strong>Line Spacing</strong> A single blank line should precede and follow each comment. The only exceptions are:</p><p>For the file header block comment that begins on line one; there is no preceding blank line in that case. For conditional compilation. Conditional compilation should include the conditional logic <em>and</em> all comments associated with the conditional logic. In this case, the blank line appears <em>before</em> the conditional, not after it. No blank lines precede any comments following the conditional. With braces. No blank line separates the line containing the opening left brace from a comment. No blank line follows a comment that may be the final line preceding a closing right brace. With Labels. No blank line separates the line containing the label from a comment.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* set a equal to b */</span></span>
<span class="line"><span>a = b;</span></span>
<span class="line"><span>/* set b equal to c */</span></span>
<span class="line"><span>b = c;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Do the impossible */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ifdef CONFIG_THE_IMPOSSIBLE</span></span>
<span class="line"><span>the_impossible();</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (a == b)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /* Only a comment */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>here:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* This is the place */</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Set a equal to b. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>a = b;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Set b equal to c. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>b = c;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ifdef CONFIG_THE_IMPOSSIBLE</span></span>
<span class="line"><span>/* Do the impossible */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>the_impossible();</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (a == b)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    /* Only a comment */</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>here:</span></span>
<span class="line"><span>  /* This is the place */</span></span></code></pre></div><p><strong>Indentation</strong> Comments should, typically, be placed before the code section to which they apply. The comment indentation should be the same as the follow indentation rules as the following code (if applicable).</p><p><strong>Short, Single line comments</strong>. Short comments must lie on a single line. The comment delimiters must lie on the same line.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/*</span></span>
<span class="line"><span> * This is a single line comment</span></span>
<span class="line"><span> */</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* This is a single line comment. */</span></span></code></pre></div><p><strong>Multi-line comments</strong>. If the comment is too long to fit on a single, it must be broken into a multi-line comment. The comment must be begin on the first line of the multi-line comment with the opening comment delimiter (<code>/*</code>). The following lines of the multi-line comment must be with an asterisk (<code>*</code>) aligned in the same column as the asterisk in the preceding line. The closing comment delimiter must lie on a separate line with the asterisk (<code>*</code>) aligned in the same column as the asterisk in the preceding line.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/*</span></span>
<span class="line"><span>   This is the first line of a multi-line comment.</span></span>
<span class="line"><span>   This is the second line of a multi-line comment.</span></span>
<span class="line"><span>   This is the third line of a multi-line comment. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* This is the first line of another multi-line comment.  */</span></span>
<span class="line"><span>/* This is the second line of another multi-line comment. */</span></span>
<span class="line"><span>/* This is the third line of another multi-line comment.  */</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* This is the first line of a multi-line comment.</span></span>
<span class="line"><span> * This is the second line of a multi-line comment.</span></span>
<span class="line"><span> * This is the third line of a multi-line comment.</span></span>
<span class="line"><span> */</span></span></code></pre></div><p><strong>Comments to the Right of Statements</strong>. Comments to the right of statements in C source files are discouraged. If such comments are used, they should be (1) very short so that they do not exceed the line width (typically 78 characters), (2) aligned so that the comment begins in the same column on each line.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dog = cat; /* Make the dog be a cat */</span></span>
<span class="line"><span>monkey = oxen; /* Make the monkey be an oxen */</span></span>
<span class="line"><span>aardvark = macaque; /* Make the aardvark be a macaque */</span></span></code></pre></div><p>Note</p><p>This is acceptable</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dog      = cat;     /* Make the dog be a cat. */</span></span>
<span class="line"><span>monkey   = oxen;    /* Make the monkey be an oxen. */</span></span>
<span class="line"><span>aardvark = macaque; /* Make the aardvark be a macaque. */</span></span></code></pre></div><p>Tip</p><p>This is preferred</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Make the dog be a cat. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dog      = cat;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Make the monkey be an oxen. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>monkey   = oxen;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Make the aardvark be a macaque. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>aardvark = macaque;</span></span></code></pre></div><p><strong>Comments to the Right of Data Definitions</strong>. Comments to the right of a declaration with an enumeration or structure, on the other hand, are encouraged, provided that the comments are short and do not exceed the maximum line width (usually 78 characters). Columnar alignment of comments is very desirable (but often cannot be achieved without violating the line width).</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct animals_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  int dog; /* This is a dog */</span></span>
<span class="line"><span>  int cat; /* This is a cat */</span></span>
<span class="line"><span>  double monkey; /* This is a monkey */</span></span>
<span class="line"><span>  double oxen; /* This is an oxen */</span></span>
<span class="line"><span>  bool aardvark; /* This is an aardvark */</span></span>
<span class="line"><span>  bool macaque; /* This is a macaque */</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>Note</p><p>This is acceptable</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct animals_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  int dog;       /* This is a dog. */</span></span>
<span class="line"><span>  int cat;       /* This is a cat. */</span></span>
<span class="line"><span>  double monkey; /* This is a monkey. */</span></span>
<span class="line"><span>  double oxen;   /* This is an oxen. */</span></span>
<span class="line"><span>  bool aardvark; /* This is an aardvark. */</span></span>
<span class="line"><span>  bool macaque;  /* This is a macaque. */</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>Tip</p><p>This is preferred</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct animals_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  int    dog;      /* This is a dog. */</span></span>
<span class="line"><span>  int    cat;      /* This is a cat. */</span></span>
<span class="line"><span>  double monkey;   /* This is a monkey. */</span></span>
<span class="line"><span>  double oxen;     /* This is an oxen. */</span></span>
<span class="line"><span>  bool   aardvark; /* This is an aardvark. */</span></span>
<span class="line"><span>  bool   macaque;  /* This is a macaque. */</span></span>
<span class="line"><span>};</span></span></code></pre></div><p><strong>Long Comments on the Right</strong>. Comments on the right of statements or data definitions must be short and fit on the same line without exceeding the maximum line length. If a longer comment is needed, then it should appear above the statement of definition rather than to the right of the definition.</p><p><strong>Breaking Long Comments to the Right of Statements</strong> Breaking long comments to the right of statements is acceptable as well, but not encouraged. In this case the comment must be begin on the first line of the multi-line, right-hand comment with the opening comment delimiter (/<em>). The following lines of the multi-line, right hand comment must be with an asterisk (</em>) aligned in the same column as the asterisk in the preceding line. The closing comment delimiter must lie on the <em>same</em> line with the asterisk.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dog = cat; /* This assignment will convert what was at one time a lowly dog into a ferocious feline. */</span></span></code></pre></div><p>Note</p><p>This is acceptable</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dog = cat;       /* This assignment will convert what was at one time a</span></span>
<span class="line"><span>                  * lowly dog into a ferocious feline. */</span></span></code></pre></div><p>Tip</p><p>This is preferred</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* This assignment will convert what was at one time a lowly dog into a</span></span>
<span class="line"><span> * ferocious feline.</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dog = cat;</span></span></code></pre></div><p><strong>Note</strong> that if the comment is continued on multiple lines, the comment alignment and multi-line comment rules still apply with one exception: The closing <code>*/</code> appears on the same line as the final text of the comment. This exception to the rule is enforced to keep the statements and definitions from becoming to spread out.</p><p><strong>Block comments</strong>. Block comments are only used to delimit groupings with the overall <a href="#fileorganization">file organization</a> and should not be used unless the usage is consistent with delimiting logical groupings in the program.</p><p><strong>C Style Comments</strong>. C99/C11/C++ style comments (beginning with <code>//</code>) should not be used with NuttX. NuttX generally follows C89 and all code outside of architecture specific directories must be compatible with C89.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// This is a structure of animals</span></span>
<span class="line"><span>struct animals_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  int    dog;      // This is a dog</span></span>
<span class="line"><span>  int    cat;      // This is a cat</span></span>
<span class="line"><span>  double monkey;   // This is a monkey</span></span>
<span class="line"><span>  double oxen;     // This is an oxen</span></span>
<span class="line"><span>  bool   aardvark; // This is an aardvark</span></span>
<span class="line"><span>  bool   macaque;  // This is a macaque</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* This is a structure of animals. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct animals_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  int    dog;      /* This is a dog. */</span></span>
<span class="line"><span>  int    cat;      /* This is a cat. */</span></span>
<span class="line"><span>  double monkey;   /* This is a monkey. */</span></span>
<span class="line"><span>  double oxen;     /* This is an oxen. */</span></span>
<span class="line"><span>  bool   aardvark; /* This is an aardvark. */</span></span>
<span class="line"><span>  bool   macaque;  /* This is a macaque. */</span></span>
<span class="line"><span>};</span></span></code></pre></div><p><strong>&quot;Commenting Out&quot; Large Code Blocks</strong>. Do not use C or C++ comments to disable compilation of large blocks of code. Instead, use <code>#if 0</code> to do that. Make sure there is a comment before the <code>#if 0</code> to explain why the code is not compiled.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void some_function(void)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ... compiled code ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /*</span></span>
<span class="line"><span>  ... disabled code ..</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ... compiled code ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void some_function(void)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ... compiled code ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //</span></span>
<span class="line"><span>  // ... disabled code ..</span></span>
<span class="line"><span>  //</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ... compiled code ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void some_function(void)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ... compiled code ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* The following code is disabled because it is no longer needed. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#if 0</span></span>
<span class="line"><span>  ... disabled code ..</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ... compiled code ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="braces" tabindex="-1">Braces <a class="header-anchor" href="#braces" aria-label="Permalink to &quot;Braces&quot;">​</a></h3><p>In general, the use of braces in the NuttX coding standard is similar to the use of braces in the <a href="https://www.gnu.org/prep/standards/standards.pdf" target="_blank" rel="noreferrer">GNU Coding standards</a> with a few subtle differences.</p><p><strong>Coding Standard:</strong></p><ul><li><strong>Always on Separate Lines</strong>. Braces always appear on a separate line containing nothing else other than white space.</li><li><strong>Never Comments on Braces</strong>. Do not put comments on the same line as braces.</li><li><strong>Compound Statements</strong>. Within this document, an opening left brace followed by a sequence of statements, and ending with a closing right brace is referred to as a <em>compound statement</em>.</li><li><strong>Nested Compound Statements</strong>. In the case where there are nested compound statements that end with several consecutive right braces, each closing right brace must lie on a separate line and must be indented to match the corresponding opening brace.</li><li><strong>Final brace followed by a single blank line</strong>. The <em>final</em> right brace must be followed by a blank line as per standard rules. There are two exceptions to this rule: <ol><li>In the case where there are nested several consecutive right braces, no blank lines should be inserted except for after the <em>final</em> right brace.</li><li>No blank should be used to separate the final, closing right brace when it is followed by a <code>break;</code> statement.</li></ol></li><li><strong>Special Indentation Rules</strong>. Special <a href="#indentation">indentation rules</a> apply to braces.</li></ul><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>while (true)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    if (valid)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>      } /* if valid */</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>      } /* not valid */</span></span>
<span class="line"><span>  } /* end forever */</span></span>
<span class="line"><span>if (a &lt; b) {</span></span>
<span class="line"><span>  if (a &lt; 0) {</span></span>
<span class="line"><span>      c = -a;</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>      c = a;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>  if (b &lt; 0) {</span></span>
<span class="line"><span>      c = -b;</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>      c = b;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>while (true)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    if (valid)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (a &lt; b)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    if (a &lt; 0)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        c = -a;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        c = a;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    if (b &lt; 0)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        c = -b;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        c = b;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p><strong>Exception to Indentation Rule for Braces</strong>. The exception is braces that following structure, enumeration, union, and function declarations. There is no additional indentation for those braces; those braces align with the beginning of the definition</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum kinds_of_dogs_e</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct dogs_s {</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  union {</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  } u;</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct cats_s</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>    union</span></span>
<span class="line"><span>     {</span></span>
<span class="line"><span>     ...</span></span>
<span class="line"><span>     } u;</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int animals(int animal)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum kinds_of_dogs_e</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct dogs_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  union</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  } u;</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct cats_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  union</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  } u;</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int animals(int animal)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="indentation" tabindex="-1">Indentation <a class="header-anchor" href="#indentation" aria-label="Permalink to &quot;Indentation&quot;">​</a></h3><p>In general, the indentation in the NuttX coding standard is similar to the indentation requirements of the <a href="https://www.gnu.org/prep/standards/standards.pdf" target="_blank" rel="noreferrer">GNU Coding standards</a> with a few subtle differences.</p><p><strong>Indentation Unit</strong>. Indentation is in units of two spaces; Each indentation level is twos spaces further to the right than the preceding indentation levels. TAB characters may not be used for indentation.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (x == y) {</span></span>
<span class="line"><span>    dosomething(x);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (x == y) {</span></span>
<span class="line"><span>      dosomething(x);</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (x == y)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    dosomething(x);</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p><strong>Use of TAB Characters</strong>. The use of TAB characters for indentation is prohibited in C source and header files. TAB characters are, however, used in make files, assembly language source files, Kconfig files and some script files. When TAB characters are used in these files, spaces may not be used for indentation. The correct TAB setting is 4 spaces (not 8) in these cases.</p><p><strong>Alignment of Braces</strong>. Note that since braces must be on a separate line (see above), this indentation by two spaces has an interesting property:</p><ul><li>All C statements (and case selectors) lie on lines that are multiples of 4 spaces (beginning with an indentation of two): 2, 6, 10, ... (4*n + 2) (for indentation level n = 0, 1, ...)</li><li>Braces lie on a separate line also indented by multiple of 4 spaces: 4, 8, 12, ... 4*n (for indentation level n = 1, 2, ...)</li></ul><p>Thus, all code at the indentation level should align on the same column. Similarly, opening and closing braces at the same indentation level should also align on the same (but different) column.</p><p><strong>Indentation of Pre-Processor Lines</strong>. C Pre-processor commands following any conditional computation are also indented following basically the indentation same rules, differing in that the <code>#</code> always remains in column 1.</p><p>When C pre-processor statements are indented, they should be should be indented by 2 spaces per level-of-indentation following the <code>#</code>. C pre-processor statements should be indented when they are enclosed within C pre-processor conditional logic (<code>#if</code>..<code>#endif</code>). The level of indentation increases with each level of such nested conditional logic.</p><p>C pre-processor statements should always be indented in this way in the <code>Pre-processor Definitions</code> <a href="#cfilestructure">section</a> of each file. C pre-processor statements may be indented in the <code>Public/Private Data</code> and <code>Public/Private Functions</code> sections of the file. However, often the indentation of C pre-processor statements conflicts with the indentation of the C code and makes the code more difficult to read. In such cases, indentation of C pre-processor statements should be omitted in those sections (only).</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#ifdef CONFIG_ABC</span></span>
<span class="line"><span>#define ABC_THING1 1</span></span>
<span class="line"><span>#define ABC_THING2 2</span></span>
<span class="line"><span>#define ABC_THING3 3</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ifdef CONFIG_ABC</span></span>
<span class="line"><span>  #define ABC_THING1 1</span></span>
<span class="line"><span>  #define ABC_THING2 2</span></span>
<span class="line"><span>  #define ABC_THING3 3</span></span>
<span class="line"><span>#endif</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#ifdef CONFIG_ABC</span></span>
<span class="line"><span>#  define ABC_THING1 1</span></span>
<span class="line"><span>#  define ABC_THING2 2</span></span>
<span class="line"><span>#  define ABC_THING3 3</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ifdef CONFIG_ABC</span></span>
<span class="line"><span>#  define ABC_THING1 1</span></span>
<span class="line"><span>#  define ABC_THING2 2</span></span>
<span class="line"><span>#  define ABC_THING3 3</span></span>
<span class="line"><span>#endif</span></span></code></pre></div><p><strong>Exception</strong>. Each header file includes <a href="#idempotence">idempotence definitions</a> at the beginning of the header file. This conditional compilation does <em>not</em> cause any change to the indentation.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#ifndef __INCLUDE_SOMEHEADER_H</span></span>
<span class="line"><span>#  define __INCLUDE_SOMEHEADER_H</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>#  define THING1 1</span></span>
<span class="line"><span>#  define THING2 2</span></span>
<span class="line"><span>#  define THING3 3</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>#endif /* __INCLUDE_SOMEHEADER_H */</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#ifndef __INCLUDE_SOMEHEADER_H</span></span>
<span class="line"><span>#define __INCLUDE_SOMEHEADER_H</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>#define THING1 1</span></span>
<span class="line"><span>#define THING2 2</span></span>
<span class="line"><span>#define THING3 3</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>#endif /* __INCLUDE_SOMEHEADER_H */</span></span></code></pre></div><h3 id="parentheses" tabindex="-1">Parentheses <a class="header-anchor" href="#parentheses" aria-label="Permalink to &quot;Parentheses&quot;">​</a></h3><p><strong>Coding Standard:</strong></p><ul><li><strong>Space after key words</strong>. Do not put a left parenthesis (<code>(</code>) immediately after any C keywords (<code>for</code>, <code>switch</code>, <code>while</code>, <code>do</code>, <code>return</code>, etc.). Put a space before the left parenthesis in these cases.</li><li><strong>Otherwise, no space before left parentheses</strong>. Otherwise, there should be no space before the left parentheses</li><li><strong>No space between function name and argument list</strong>. There should be no space between a function name and an argument list.</li><li><strong>Never space before the right parentheses</strong>. There should never be space before a right parenthesis ( <code>)</code> ).</li><li><strong>No parentheses around returned values</strong>. Returned values should never be enclosed in parentheses unless the parentheses are required to force the correct order of operations in a computed return value.</li></ul><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int do_foobar ( void )</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  int ret = 0;</span></span>
<span class="line"><span>  int i;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  for( i = 0; ( ( i &lt; 5 ) || ( ret &lt; 10 ) ); i++ )</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      ret = foobar ( i );</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return ( ret );</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int do_foobar(void)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  int ret = 0;</span></span>
<span class="line"><span>  int i;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  for (i = 0; i &lt; 5 || ret &lt; 10; i++)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      ret = foobar(i);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return ret;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>NOTE:</strong> Many people do not trust their understanding of the precedence of operators and so use lots of parentheses in expressions to force the order of evaluation even though the parentheses may have no effect. This will certainly avoid errors due to an unexpected order of evaluation, but can also make the code ugly and overly complex (as in the above example). In general, NuttX does not use unnecessary parentheses to force order of operations. There is no particular policy in this regard. However, you are are advised to check your C Programming Language book if necessary and avoid unnecessary parenthesis when possible.</p><h2 id="data-and-type-definitions" tabindex="-1">Data and Type Definitions <a class="header-anchor" href="#data-and-type-definitions" aria-label="Permalink to &quot;Data and Type Definitions&quot;">​</a></h2><h3 id="one-definition-declaration-per-line" tabindex="-1">One Definition/Declaration Per Line <a class="header-anchor" href="#one-definition-declaration-per-line" aria-label="Permalink to &quot;One Definition/Declaration Per Line&quot;">​</a></h3><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>extern long time, money;</span></span>
<span class="line"><span>char **ach, *bch;</span></span>
<span class="line"><span>int i, j, k;</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>extern long time;</span></span>
<span class="line"><span>extern long money;</span></span>
<span class="line"><span>FAR char **ach;</span></span>
<span class="line"><span>FAR char *bch;</span></span>
<span class="line"><span>int i;</span></span>
<span class="line"><span>int j;</span></span>
<span class="line"><span>int k;</span></span></code></pre></div><p><strong>NOTE</strong>: See the discussion of <a href="#farnear">pointers</a> for information about the <code>FAR</code> qualifier used above.</p><h3 id="global-variables" tabindex="-1">Global Variables <a class="header-anchor" href="#global-variables" aria-label="Permalink to &quot;Global Variables&quot;">​</a></h3><p><strong>Global vs. Local vs. Public vs. Private</strong> By a <em>global</em> variable it is meant any variable defined outside of a function. The distinction is between this kind of <em>global</em> and function <em>local</em> definition and refers to the scope a symbol <em>within a file</em>. A related concept for all <em>global</em> names defined within a file is the scope of the name across different files. If the global symbol is prepended with the <code>static</code> storage class then the scope of the global symbol is within the file only. This is a somewhat different concept and within NuttX you will find these distinguished as <em>private</em> vs. <em>public</em> global symbols. However, within this standard, the term <em>global variable</em> will refer to any variable that has more than local scope.</p><p><strong>Coding Standard:</strong></p><ul><li><strong>Short global variable names</strong>. Names should be terse, but generally descriptive of what the variable is for. Try to say something with the variable name, but don&#39;t try to say too much. For example, the variable name of <code>g_filelen</code> is preferable to something like <code>g_lengthoffile</code>.</li><li><strong>Global variable prefix</strong>. All global variables begin with the prefix <code>g_</code> to indicate the scope of variable.</li><li><strong>Module name prefix</strong> If a global variable belongs in a <em>module</em> with a name of, say <code>xyz</code>, then that module should be included as part of the prefix like: <code>g_xyz_</code>.</li><li><strong>Lowercase</strong>, Use all lower case letters.</li><li><strong>Minimal use of</strong> <code>_</code>. Preferably there are no <code>_</code> separators within the name. Long variable names might require some delimitation using <code>_</code>. Long variable names, however, are discouraged.</li><li><strong>Use structures</strong>. If possible, wrap all global variables within a structure to minimize the likelihood of name collisions.</li><li><strong>Avoid global variables when possible</strong>. Use of global variables, in general, is discourage unless there is no other reasonable solution.</li></ul><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>extern int someint;</span></span>
<span class="line"><span>static int anotherint;</span></span>
<span class="line"><span>uint32_t dwA32BitInt;</span></span>
<span class="line"><span>uint32_t gAGlobalVariable;</span></span></code></pre></div><p>Note</p><p>This is acceptable</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>extern int g_someint;</span></span>
<span class="line"><span>static int g_anotherint;</span></span>
<span class="line"><span>uint32_t g_a32bitint;</span></span>
<span class="line"><span>uint32_t g_aglobal;</span></span></code></pre></div><p>Tip</p><p>This is preferred</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct my_variables_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  uint32_t a32bitint;</span></span>
<span class="line"><span>  uint32_t aglobal;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>extern int g_someint;</span></span>
<span class="line"><span>static int g_anotherint;</span></span>
<span class="line"><span>struct my_variables_s g_myvariables;</span></span></code></pre></div><h3 id="parameters-and-local-variables" tabindex="-1">Parameters and Local Variables <a class="header-anchor" href="#parameters-and-local-variables" aria-label="Permalink to &quot;Parameters and Local Variables&quot;">​</a></h3><p><strong>Coding Standard:</strong></p><ul><li><strong>Common naming standard</strong>. Naming for function parameters and local variables is the same.</li><li><strong>Short variable names</strong>. Names should be terse, but generally descriptive of what the variable is for. Try to say something with the variable name, but don&#39;t try to say too much. For example, the variable name of <code>len</code> is preferable to something like <code>lengthofiobuffer</code>.</li><li><strong>No special ornamentation</strong>. There is no special ornamentation of the name to indication that the variable is a local variable. The prefix <code>p</code> or <code>pp</code> may be used on names of pointers (or pointer to pointers) if it helps to distinguish the variable from some other local variable with a similar name. Even this convention is discouraged when not necessary.</li><li><strong>Lowercase</strong> Use all lower case letters.</li><li><strong>Minimal use of single character variable names</strong>. Short variable names are preferred. However, single character variable names should be avoided. Exceptions to this include <code>i</code>, <code>j</code>, and <code>k</code> which are reserved only for use as loop indices (part of our Fortran legacy).</li><li><strong>Minimal use of</strong> <code>_</code>. Preferably there are no <code>_</code> separators within the name. Long variable names might require some delimitation using <code>_</code>. Long variable names, however, are discouraged.</li></ul><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>uint32_t somefunction(int a, uint32_t dwBValue)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  uint32_t this_is_a_long_variable_name = 1;</span></span>
<span class="line"><span>  int i;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  for (i = 0; i &amp;lt; a; i++)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      this_is_a_long_variable_name *= dwBValue--;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return this_is_a_long_variable_name;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>uint32_t somefunction(int limit, uint32_t value)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  uint32_t ret = 1;</span></span>
<span class="line"><span>  int i;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  for (i = 0; i &amp;lt; limit; i++)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      ret *= value--;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return ret;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>NOTE:</strong> You will see the local variable named <code>ret</code> is frequently used in the code base for the name of a local variable whose value will be returned or to received the returned value from a called function.</p><h3 id="type-definitions" tabindex="-1">Type Definitions <a class="header-anchor" href="#type-definitions" aria-label="Permalink to &quot;Type Definitions&quot;">​</a></h3><p><strong>Coding Standard:</strong></p><ul><li><strong>Short type names</strong>. Type names should be terse, but generally descriptive of what the type is for. Try to say something with the type name, but don&#39;t try to say too much. For example, the type name of <code>fhandle_t</code> is preferable to something like <code>openfilehandle_t</code>.</li><li><strong>Type name suffix</strong>. All <code>typedef</code>&#39;ed names end with the suffix <code>_t</code>.</li><li><strong>Module name prefix</strong> If a type belongs in a <em>module</em> with a name of, say <code>xyz</code>, then that module should be included as a prefix to the type name like: <code>xyz_</code>.</li><li><strong>Lowercase</strong>. Use all lower case letters.</li><li><strong>Minimal use of</strong> <code>_</code>. Preferably there are few <code>_</code> separators within the type name. Long type names might require some delimitation using <code>_</code>. Long type names, however, are discouraged.</li></ul><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef void *myhandle;</span></span>
<span class="line"><span>typedef int myInteger;</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef FAR void *myhandle_t;</span></span>
<span class="line"><span>typedef int myinteger_t;</span></span></code></pre></div><p><strong>NOTE</strong>: See the discussion of <a href="#farnear">pointers</a> for information about the <code>FAR</code> qualifier used above.</p><h3 id="structures" tabindex="-1">Structures <a class="header-anchor" href="#structures" aria-label="Permalink to &quot;Structures&quot;">​</a></h3><p><strong>Structure Naming</strong></p><ul><li><strong>No un-named structures</strong>. All structures must be named, even if they are part of a type definition. That is, a structure name must follow the reserved word <code>struct</code> in all structure definitions. There are two exceptions to this rule: <ol><li>First for structures that are defined within another union or structure (discouraged). In those cases, the structure name should always be omitted.</li><li>Second for structures as the type of a local variable. In this case, again, the structure name should always be omitted.</li></ol></li><li><strong>Structured defined with structures discouraged</strong>. Fields within a structure may be another structure that is defined only with the scope of the containing structure. This practice is acceptable, but discouraged.</li><li><strong>No un-named structure fields</strong>. Structures may contain other structures as fields. In this case, the structure field must be named. C11 permits such un-named structure fields within a structure. NuttX generally follows C89 and all code outside of architecture specific directories must be compatible with C89.</li><li><strong>No structure definitions within Type Definition</strong>. The practice of defining a structure within a type definition is discouraged. It is preferred that the structure definition and the type definition be separate definitions. In general, the NuttX coding style discourages any <code>typdef</code>-ing of structures; normally the full structure name is used as types throughout the code. The reason for this is that is structure pointers may be forward referenced in header files without having to include the file the provides the type definition. This greatly reduces header file coupling.</li><li><strong>Short structure names</strong>. Structure names should be terse, but generally descriptive of what the structure contains. Try to say something with the structure name, but don&#39;t try to say too much. For example, the structure name of <code>xyz_info_s</code> is preferable to something like <code>xyz_datainputstatusinformation_s</code>.</li><li><strong>Structure name suffix</strong>. All structure names end with the suffix <code>_s</code>.</li><li><strong>Module name prefix</strong> If a structure belongs to a <em>module</em> with a name of, say <code>xyz</code>, then that module should be included as a prefix to the structure name like: <code>xyz_</code>.</li><li><strong>Lowercase</strong>. Use all lower case letters.</li><li><strong>Minimal use of</strong> <code>_</code>. Preferably there are few <code>_</code> separators within the structure name. Long variable names might require some delimitation using <code>&#39;_&#39;</code>. Long variable names, however, are discouraged.</li></ul><p><strong>Structure Field Naming</strong></p><ul><li><strong>Common variable naming</strong>. Structure field naming is generally the same as for local variables.</li><li><strong>One definition per line</strong>. The <a href="#onedatperline">one definition per line</a> rule applies to structure fields, including bit field definitions.</li><li><strong>Each field should be commented</strong>. Each structure field should be commented. Commenting should follow the <a href="#comments">standard conventions</a>.</li><li><strong>Optional structure field prefix</strong>. It make be helpful to add a two-letter prefix to each field name so that is is clear which structure the field belongs to. Although a good practice, that convention has not been used consistently in NuttX.</li><li><strong>Lowercase</strong>. Use all lower case letters.</li><li><strong>Minimal use of</strong> <code>_</code>. Preferably there are few <code>_</code> separators within the field name. Long variable names might require some delimitation using <code>&#39;_&#39;</code>. Long variable names, however, are discouraged.</li></ul><p><strong>Other Applicable Coding Standards</strong>. See sections related to <a href="#lines">line formatting</a>, <a href="#braces">use of braces</a>, <a href="#indentation">indentation</a>, and <a href="#comments">comments</a>.</p><p><strong>Size Optimizations</strong>. When declaring fields in structures, order the declarations in such a way as to minimize memory waste due of data alignment. This essentially means that that fields should be organized by data size, not by functionality: Put all pointers together, all <code>uint8_t</code>&#39;s together, all <code>uint32_t</code>&#39;s together. Data types withi well known like <code>uint8_t</code> and <code>uint32_t</code> should also be place in either ascending or descending size order.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct       /* Un-named structure */</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  int val1, val2, val3; /* Values 1-3 */</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>} xzy_info_t;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct xyz_information</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  uint8_t bita : 1,  /* Bit A */</span></span>
<span class="line"><span>          bitb : 1,  /* Bit B */</span></span>
<span class="line"><span>          bitc : 1;  /* Bit C */</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct abc_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  struct</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    int a;           /* Value A */</span></span>
<span class="line"><span>    int b;           /* Value B */</span></span>
<span class="line"><span>    int c;           /* Value C */</span></span>
<span class="line"><span>  };                 /* Un-named structure field */</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct xyz_info_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  int val1;          /* Value 1 */</span></span>
<span class="line"><span>  int val2;          /* Value 2 */</span></span>
<span class="line"><span>  int val3;          /* Value 3 */</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>Warning</p><p>This is discouraged</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct xyz_info_s xzy_info_t;</span></span></code></pre></div><p>The use of typedef&#39;ed structures is acceptable but discouraged.</p><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct xyz_info_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  uint8_t bita : 1,  /* Bit A */</span></span>
<span class="line"><span>  uint8_t bitb : 1,  /* Bit B */</span></span>
<span class="line"><span>  uint8_t bitc : 1,  /* Bit C */</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>Warning</p><p>This is discouraged</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct abc_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  struct</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    int a;           /* Value A */</span></span>
<span class="line"><span>    int b;           /* Value B */</span></span>
<span class="line"><span>    int c;           /* Value C */</span></span>
<span class="line"><span>  } abc;</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>The use of structures defined within other structures is acceptable provided that they define named fields. The general practice of defining a structure within the scope of another structure, however, is still but discouraged in any case. The following is preferred:</p><p>Tip</p><p>This is preferred</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct abc_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  int a;             /* Value A */</span></span>
<span class="line"><span>  int b;             /* Value B */</span></span>
<span class="line"><span>  int c;             /* Value C */</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>};</span></span></code></pre></div><h3 id="unions" tabindex="-1">Unions <a class="header-anchor" href="#unions" aria-label="Permalink to &quot;Unions&quot;">​</a></h3><p><strong>Union and Field Names</strong>. Naming of unions and fields within unions follow the same naming rules as for <a href="#structures">structures and structure fields</a>. The only difference is that the suffix <code>_u</code> is used to identify unions.</p><p><strong>Other Applicable Coding Standards</strong>. See sections related to <a href="#lines">line formatting</a>, <a href="#braces">use of braces</a>, <a href="#indentation">indentation</a>, and <a href="#comments">comments</a>.</p><p>Note</p><p>This is acceptable</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>union xyz_union_u  /* All unions must be named */</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  uint8_t  b[4];   /* Byte values. */</span></span>
<span class="line"><span>  uint16_t h[2];   /* Half word values. */</span></span>
<span class="line"><span>  uint32_t w;      /* Word Value. */</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>typedef union xyz_union_u xzy_union_t;</span></span></code></pre></div><p>The use of typedef&#39;ed unions is acceptable but discouraged.</p><p>Tip</p><p>This is preferred</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct xyz_info_s</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  union</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    uint8_t  b[4]; /* Byte values. */</span></span>
<span class="line"><span>    uint16_t h[2]; /* Half word values. */</span></span>
<span class="line"><span>    uint32_t w;    /* Word Value. */</span></span>
<span class="line"><span>  } u;             /* All union fields must be named */</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>};</span></span></code></pre></div><p><strong>NOTE:</strong> Note that the union fields within structures are often named <code>u</code>. This is another exception to the prohibition against using single character variable and field names. The short field name <code>u</code> clearly identifies a union field and prevents the full name of the union value from being excessively long.</p><h3 id="enumerations" tabindex="-1">Enumerations <a class="header-anchor" href="#enumerations" aria-label="Permalink to &quot;Enumerations&quot;">​</a></h3><p><strong>Enumeration Naming</strong>. Naming of enumerations follow the same naming rules as for <a href="#structures">structure</a> and <a href="#unions&quot;">union</a> naming. The only difference is that the suffix <code>_e</code> is used to identify an enumeration.</p><p><strong>Enumeration Value Naming</strong>. Enumeration values, however, following a naming convention more similar to <a href="#macros">macros</a>.</p><ul><li><strong>Uppercase</strong>. Enumeration values are always in upper case.</li><li><strong>Use of</strong> <code>_</code> <strong>encouraged</strong>. Unlike other naming, use of the underscore character <code>_</code> to break up enumeration names is encouraged.</li><li><strong>Prefix</strong>. Each value in the enumeration should begin with an upper-case prefix that identifies the value as a member of the enumeration. This prefix should, ideally, derive from the name of the enumeration.</li><li><strong>No dangling commas</strong>. There should be no dangling comma on the final value of the enumeration. The most commonly used tool chain are tolerant of such dangling commas, but others will not.</li></ul><p><strong>Other Applicable Coding Standards</strong>. See sections related to <a href="#lines">line formatting</a>, <a href="#braces">use of braces</a>, <a href="#indentation">indentation</a>, and <a href="#comments">comments</a>.</p><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum xyz_state_e</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  XYZ_STATE_UNINITIALIZED = 0, /* Uninitialized state. */</span></span>
<span class="line"><span>  XYZ_STATE_WAITING,           /* Waiting for input state. */</span></span>
<span class="line"><span>  XYZ_STATE_BUSY,              /* Busy processing input state. */</span></span>
<span class="line"><span>  XYZ_STATE_ERROR,             /* Halted due to an error. */</span></span>
<span class="line"><span>  XYZ_STATE_TERMINATING,       /* Terminating stated. */</span></span>
<span class="line"><span>  XYZ_STATE_TERMINATED         /* Terminating stated. */</span></span>
<span class="line"><span>};</span></span></code></pre></div><h3 id="c-pre-processor-macros" tabindex="-1">C Pre-processor Macros <a class="header-anchor" href="#c-pre-processor-macros" aria-label="Permalink to &quot;C Pre-processor Macros&quot;">​</a></h3><p><strong>Coding Standard:</strong></p><p><strong>Macro Naming</strong>. Macro naming following a naming convention similar to the naming of <a href="#enumerations">enumeration values</a>.</p><ul><li><strong>Uppercase</strong>. Macro names are always in upper case.</li><li><strong>Lowercase Exceptions</strong>. There are a few lower case values in NuttX macro names. Such as a lower-case <code>p</code> for a period or decimal point (such as <code>VOLTAGE_3p3V</code>). I have also used lower-case <code>v</code> for a version number (such as <code>CONFIG_NET_IPv6</code>). However, these are exceptions to the rule rather than illustrating a rule.</li><li><strong>Macros that could be functions</strong>. Lower-case macro names are also acceptable if the macro is a substitute for a function name that might be used in some other context. In that case, normal function naming applies.</li><li><strong>Use of</strong> <code>_</code> <strong>encouraged</strong>. Unlike other naming, use of the underscore character <code>_</code> to break up macro names is encouraged.</li><li><strong>Prefix</strong>. Each related macro value should begin with an upper-case prefix that identifies the value as part of a set of values (and also to minimize the likelihood of naming collisions).</li><li><strong>Single space after</strong> <code>#define</code>. A single space character should separate the <code>#define</code> from the macro name. Tabs are never used.</li><li><strong>Normal commenting rules</strong>. Normal commenting rules apply.</li><li><strong>Line continuations</strong>. Macro definitions may be continued on the next line by terminating the line with the <code>\\</code> character just before the newline character. There should be a single space before the <code>\\</code> character. Aligned <code>\\</code> characters on multiple line continuations are discouraged because they are a maintenance problem.</li><li><strong>Parentheses around macro argument expansions</strong>. Macros may have argument lists. In the macros expansion, each argument should be enclosed in parentheses.</li><li><strong>Real statements</strong>. If a macro functions as a statement, then the macro expansion should be wrapped in <code>do { ... } while (0)</code> to assume that the macros is, indeed, a statement.</li><li><strong>Magic numbers are prohibited in code</strong>. Any numeric value is not intuitively obvious, must be properly named and provided as either a pre-processor macro or an enumeration value.</li><li><strong>Side effects</strong>. Be careful of side effects.</li><li><strong>Indentation</strong>. See the <a href="#indentation">Indentation of Pre-Processor Lines</a> requirements above.</li></ul><p><strong>Other Applicable Coding Standards</strong>. See sections related to <a href="#lines">line formatting</a>, <a href="#indentation">indentation</a>, and <a href="#comments">comments</a>.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#define max(a,b) a &gt; b ? a : b</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define ADD(x,y) x + y</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ifdef HAVE_SOMEFUNCTION</span></span>
<span class="line"><span>int somefunction(struct somestruct_s* psomething);</span></span>
<span class="line"><span>#else</span></span>
<span class="line"><span>#define SOMEFUNCTION() (0)</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#   define  IS_A_CAT(c)     ((c) == A_CAT)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define LONG_MACRO(a,b)                                  \\</span></span>
<span class="line"><span>  {                                                      \\</span></span>
<span class="line"><span>    int value;                                           \\</span></span>
<span class="line"><span>    value = b-1;                                         \\</span></span>
<span class="line"><span>    a = b*value;                                         \\</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define DO_ASSIGN(a,b) a = b</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#define MAX(a,b) (((a) &gt; (b)) ? (a) : (b))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define ADD(x,y) ((x) + (y))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ifdef HAVE_SOMEFUNCTION</span></span>
<span class="line"><span>int somefunction(struct somestruct_s* psomething);</span></span>
<span class="line"><span>#else</span></span>
<span class="line"><span>#  define somefunction(p) (0)</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span># define IS_A_CAT(c)  ((c) == A_CAT)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define LONG_MACRO(a,b) \\</span></span>
<span class="line"><span>  { \\</span></span>
<span class="line"><span>    int value; \\</span></span>
<span class="line"><span>    value = (b)-1; \\</span></span>
<span class="line"><span>    (a) = (b)*value; \\</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define DO_ASSIGN(a,b) do { (a) = (b); } while (0)</span></span></code></pre></div><h3 id="pointer-variables" tabindex="-1">Pointer Variables <a class="header-anchor" href="#pointer-variables" aria-label="Permalink to &quot;Pointer Variables&quot;">​</a></h3><p><strong>Pointer Naming</strong>. Pointers following same naming conventions as for other variable types. A pointer (or pointer-to-a-pointer) variable may be prefaced with <code>p</code> (or <code>pp</code>) with no intervening underscore character <code>_</code> in order to identify that variable is a pointer. That convention is not encouraged, however, and is only appropriate if there is some reason to be concerned that there might otherwise be confusion with another variable that differs only in not being a pointer.</p><p><strong>White Space</strong>. The asterisk used in the declaration of a pointer variable or to dereference a pointer variable should be placed immediately before the variable name with no intervening spaces. A space should precede the asterisk in a cast to a pointer type.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int somefunction(struct somestruct_s* psomething);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ptr = (struct somestruct_s*)value;</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int somefunction(FAR struct somestruct_s *something);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ptr = (FAR struct somestruct_s *)value;</span></span></code></pre></div><p><code>FAR</code>, <code>NEAR</code>, <code>DSEG</code> and <code>CODE</code> pointers. Some architectures require a qualifier on pointers to identify the address space into which the pointer refers. The macros <code>FAR</code>, <code>NEAR</code>, <code>DSEG</code> and <code>CODE</code> are defined in <code>include/nuttx/compiler.h</code> to provide meaning for this qualifiers when needed. For portability, the general rule is that pointers to data that may lie in the stack, heap, <code>.bss</code>, or <code>.data</code> should be prefaced by the qualifier <code>FAR</code>; pointers to functions probably lie in a code address space and should have the qualifier <code>CODE</code>. The typical effect of these macros on architectures where they have meaning to determine the size of the pointer (size in the sense of the width of the pointer value in bits).</p><h3 id="initializers" tabindex="-1">Initializers <a class="header-anchor" href="#initializers" aria-label="Permalink to &quot;Initializers&quot;">​</a></h3><p><strong>Applicable Coding Standards</strong>. See the section related to <a href="#parentheses">parentheses</a>.</p><p><strong>C89 Compatibility</strong>. All common NuttX code must conform to ANSII C89 requirements. Newer C standards permit more flexible initialization with named initializers and array initializers. However, these are not backward compatible with C89 and cannot be used in common code. Newer C99 features may be included in architecture-specific sub-directories where there is no possibility of the use of such older toolchains. C11 is included in NuttX, but has not been verified and, hence, it not encourage anywhere.</p><h2 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Functions&quot;">​</a></h2><h3 id="function-headers" tabindex="-1">Function Headers <a class="header-anchor" href="#function-headers" aria-label="Permalink to &quot;Function Headers&quot;">​</a></h3><p><strong>Coding Standard:</strong></p><ul><li><p><strong>Function headers</strong>. Each function is preceded by a function header. The function header is a <em>block comment</em> that provides information about the function. The block comment consists of the following:</p><ul><li>The block comment begins with a line that consists of the opening C comment in column 1 (<code>/*</code>) followed by a series of asterisks extending to the length of the line (usually to column 78).</li><li>The block comment ends with a line that consists of series of asterisks beginning at column 2 and extending to the near the end line (usually to column 77) followed by the closing C comment in (usually at column 78 for a total length of 79 characters).</li><li>Information about the function is included in lines between the first and final lines. Each of these begin with a space in column 1, an sterisk (<code>*</code>) in column 2, and a space in column 3.</li></ul></li><li><p><strong>Function header preceded by one blank line</strong>. Exactly one blank line precedes each function header.</p></li><li><p><strong>Function header followed by one blank line</strong>. Exactly one blank line is placed after function header and before the function definition.</p></li><li><p><strong>Function header sections</strong>. Within the function header, the following data sections must be provided:</p><ul><li><code>* Name:</code> followed by the name of the function on the same line.</li><li><code>* Description:</code> followed by a description of the function beginning on the second line. Each line of the function description is indented by two additional spaces.</li><li><code>* Input Parameters:</code> followed by a description of the of each input parameter beginning on the second line. Each input parameter begins on a separator line indented by two additional spaces. The description needs to include (1) the name of the input parameters, and (2) a short description of the input parameter.</li><li><code>* Returned Value:</code> followed by a description of the of returned value(s) beginning on the second line. The description of the returned value should identify all error values returned by the function.</li><li><code>* Assumptions/Limitations:</code> followed by a any additional information that is needed to use the function correctly. This section is optional and may be omitted with there is no such special information required for use of the function.</li></ul><p>Each of these data sections is separated by a single line like <code>*</code>.</p></li></ul><p><strong>Function header template</strong>. Refer to <a href="#cfilestructure">Appendix A</a> for the template for a function header.</p><h3 id="function-naming" tabindex="-1">Function Naming <a class="header-anchor" href="#function-naming" aria-label="Permalink to &quot;Function Naming&quot;">​</a></h3><p><strong>Coding Standard:</strong></p><ul><li><strong>Short function names</strong>. Function names should be terse, but generally descriptive of what the function is for. Try to say something with the function name, but don&#39;t try to say too much. For example, the variable name of <code>xyz_putvalue</code> is preferable to something like <code>xyz_savethenewvalueinthebuffer</code>.</li><li><strong>Lowercase</strong>. Use all lower case letters.</li><li><strong>Module prefix</strong>. All functions in the same <em>module</em>, or <em>sub-system</em>, or within the same file should have a name beginning with a common prefix separated from the remainder of the function name with the underscore, <code>&#39;_&#39;</code>, character. For example, for a module called <em>xyz</em>, all of the functions should begin with <code>xyz_</code>.</li><li><strong>Extended prefix</strong>. Other larger functional grouping should have another level in the naming convention. For example, if module <em>xyz</em> contains a set of functions that manage a set of I/O buffers (IOB), then those functions all should get naming beginning with a common prefix like <code>xyz_iob_</code>.</li><li><strong>Use of</strong> <code>_</code> <strong>discouraged</strong>. Further use of the <code>&#39;_&#39;</code> separators is discouraged in function naming. Long function names might require some additional elimitation using <code>&#39;_&#39;</code>. Long function names, however, are also discouraged.</li><li><strong>Verbs and Objects</strong>. The remainder of the function name should be either in the form of <em>verb-object</em> or <em>object-verb</em>. It does not matter which as long as the usage is consistent within the <em>module</em>. Common verbs include <em>get</em> and <em>set</em> (or <em>put</em>) for operations that retrieve or store data, respectively. The verb <em>is</em> is reserved for functions that perform some test and return a boolean value to indicate the result of the test. In this case, the <em>object</em> should indicate what is testing and the return value of <code>true</code> should be consistent with result of the test being true.</li></ul><h3 id="parameter-lists" tabindex="-1">Parameter Lists <a class="header-anchor" href="#parameter-lists" aria-label="Permalink to &quot;Parameter Lists&quot;">​</a></h3><p><strong>Coding Standards</strong>. See general rules for <a href="#localvariable">parameter naming</a>. See also the sections related to the use of <a href="#parentheses">parentheses</a>.</p><p><strong>Use of</strong> <code>const</code> <strong>parameters</strong>. Use of the <code>const</code> storage class is encouraged. This is appropriate to indicate that the function will not modify the object.</p><h3 id="function-body" tabindex="-1">Function Body <a class="header-anchor" href="#function-body" aria-label="Permalink to &quot;Function Body&quot;">​</a></h3><p><strong>Coding Standard:</strong></p><ul><li><strong>Single compound statement</strong>. The function body consists of a single compound statement.</li><li><strong>Braces in column 1</strong> The opening and close braces of the compound statement must be placed in column one.</li><li><strong>First definition or statement in column 3</strong>. The first data definitions or statements in the function body are indented by two spaces. Standards for statements are covered in the <a href="#statements">following paragraph</a></li><li><strong>Local variables first</strong>. Because NuttX conforms to the older C89 standard, all variables that have scope over the compound statement must be defined at the beginning of the compound statement prior to any executable statements. Local variable definitions intermixed within the following sequence of executable statements are forbidden. A single blank line must follow the local variable definitions separating the local variable definitions from the following executable statements. <strong>NOTE</strong> that a function body consists of a compound statement, but typically so does the statement following <code>if</code>, <code>else</code>, <code>for</code>, <code>while</code>, <code>do</code>. Local variable definitions are also acceptable at the beginning of these compound statements as with any other.</li><li><strong>Long functions are discouraged</strong>. As a rule of thumb, the length of a function should be limited so that it would fit on a single page (if you were to print the source code).</li><li><strong>Return Statement</strong>. The argument of the <code>return</code> statement should <em>not</em> be enclosed in parentheses. A reasonable exception is the case where the returned value argument is a complex expression and where the parentheses improve the readability of the code. Such complex expressions might be Boolean expressions or expressions containing conditions. Simple arithmetic computations would not be considered <em>complex</em> expressions.</li><li><strong>Space after the function body</strong>. A one (and only one) blank line must follow the closing right brace of the function body.</li></ul><p><strong>Other Applicable Coding Standards</strong>. See sections related to <a href="#general">General Conventions</a>, <a href="#localvariable">Parameters and Local Variables</a>, and <a href="#statements">Statements</a>.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int myfunction(int a, int b)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    int c, d;</span></span>
<span class="line"><span>    c = a</span></span>
<span class="line"><span>    d = b;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    int e = c + d;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for (int i = 0; i &amp;lt; a; i++)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        for (int j = 0; j &amp;lt; b; j++)</span></span>
<span class="line"><span>          {</span></span>
<span class="line"><span>            e += j * d;</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return (e / a);</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int myfunction(int a, int b)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  int c;</span></span>
<span class="line"><span>  int d;</span></span>
<span class="line"><span>  int e;</span></span>
<span class="line"><span>  int i;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  c = a</span></span>
<span class="line"><span>  d = b;</span></span>
<span class="line"><span>  e = c + d;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  for (i = 0; i &amp;lt; a; i++)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      int j;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      for (j = 0; j &amp;lt; b; j++)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          e += j * d;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return e / a;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="returned-values" tabindex="-1">Returned Values <a class="header-anchor" href="#returned-values" aria-label="Permalink to &quot;Returned Values&quot;">​</a></h3><p><strong>OS Internal Functions</strong>. In general, OS internal functions return a type <code>int</code> to indicate success or failure conditions. Non-negative values indicate success. The return value of zero is the typical success return value, but other successful return can be represented with other positive values. Errors are always reported with negative values. These negative values must be a well-defined <code>errno</code> as defined in the file <code>nuttx/include/errno.h</code>.</p><p><strong>Application/OS Interface</strong>. All but a few OS interfaces conform to documented standards that have precedence over the coding standards of this document.</p><p><strong>Checking Return Values</strong>. Callers of internal OS functions should always check return values for an error. At a minimum, a debug statement should indicate that an error has occurred. Ignored return values are always suspicious. All calls to <code>malloc</code> or <code>realloc</code>, in particular, must be checked for failures to allocate memory to avoid use of NULL pointers.</p><h2 id="statements" tabindex="-1">Statements <a class="header-anchor" href="#statements" aria-label="Permalink to &quot;Statements&quot;">​</a></h2><h3 id="one-statement-per-line" tabindex="-1">One Statement Per Line <a class="header-anchor" href="#one-statement-per-line" aria-label="Permalink to &quot;One Statement Per Line&quot;">​</a></h3><p><strong>Coding Standard:</strong></p><ul><li><strong>One statement per line</strong>. There should never be more than one statement on a line.</li><li><strong>No more than one assignment per statement</strong>. Related to this, there should never be multiple assignments in the same statement.</li><li><strong>Statements should never be on the same line as any keyword</strong>. Statements should never be on the same line as case selectors or any C keyword.</li></ul><p><strong>Other Applicable Coding Standards</strong>. See the section related to the use of <a href="#braces">braces</a>.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (var1 &amp;lt; var2) var1 = var2;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>case 5: var1 = var2; break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var1 = 5; var2 = 6; var3 = 7;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var1 = var2 = var3 = 0;</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (var1 &amp;lt; var2)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    var1 = var2;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>case 5:</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    var1 = var2;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var1 = 5;</span></span>
<span class="line"><span>var2 = 6;</span></span>
<span class="line"><span>var3 = 7;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var1 = 0;</span></span>
<span class="line"><span>var2 = 0;</span></span>
<span class="line"><span>var3 = 0;</span></span></code></pre></div><h3 id="casts" tabindex="-1">Casts <a class="header-anchor" href="#casts" aria-label="Permalink to &quot;Casts&quot;">​</a></h3><p><strong>Coding Standard:</strong></p><ul><li><strong>No space in cast</strong>. There should be no space between a cast and the value being cast.</li></ul><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct something_s *x = (struct something_s*) y;</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct something_s *x = (struct something_s *)y;</span></span></code></pre></div><h3 id="operators" tabindex="-1">Operators <a class="header-anchor" href="#operators" aria-label="Permalink to &quot;Operators&quot;">​</a></h3><p><strong>Spaces before and after binary operators</strong>. All binary operators (operators that come between two values), such as <code>+</code>, <code>-</code>, <code>=</code>, <code>!=</code>, <code>==</code>, <code>&gt;</code>, etc. should have a space before and after the operator, for readability. As examples:</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for=bar;</span></span>
<span class="line"><span>if(a==b)</span></span>
<span class="line"><span>for(i=0;i&lt;5;i++)</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for = bar;</span></span>
<span class="line"><span>if (a == b)</span></span>
<span class="line"><span>for (i = 0; i &lt; 5; i++)</span></span></code></pre></div><p><strong>No space separating unary operators</strong>. Unary operators (operators that operate on only one value), such as <code>++</code>, should <em>not</em> have a space between the operator and the variable or number they are operating on.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>x ++;</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>x++;</span></span></code></pre></div><p><strong>Forbidden Multicharacter Forms</strong>. Many operators are expressed as a character in combination with <code>=</code> such as <code>+=</code>, <code>&gt;=</code>, <code>&gt;&gt;=</code>, etc. Some compilers will accept the <code>=</code> at the beginning or the end of the sequence. This standard, however, requires that the <code>=</code> always appear last in order to avoid ambiguities that may arise if the <code>=</code> were to appear first. For example, <code>a =++ b;</code> could also be interpreted as <code>a =+ +b;</code> or <code>a = ++b</code> all of which are very different.</p><h3 id="if-then-else-statement" tabindex="-1"><code>if then else</code> Statement <a class="header-anchor" href="#if-then-else-statement" aria-label="Permalink to &quot;\`if then else\` Statement&quot;">​</a></h3><p><strong>Coding Standard:</strong></p><ul><li><code>if</code> <strong>separated from</strong> <code>&lt;condition&gt;</code>. The <code>if</code> keyword and the <code>&lt;condition&gt;</code> must appear on the same line. The <code>if</code> keyword and the <code>&lt;condition&gt;</code> must be separated by a single space.</li><li><strong>Indentation and parentheses</strong>. <code>if &lt;condition&gt;</code> follows the standard indentation and parentheses rules.</li><li><strong>Alignment</strong>. The <code>if</code> in the <code>if &lt;condition&gt;</code> line and the <code>else</code> must be aligned at the same column.</li><li><strong>Statement(s) always enclosed in braces</strong>. Statement(s) following the <code>if &lt;condition&gt;</code> and <code>else</code> keywords must always be enclosed in braces. Braces must follow the <code>if &lt;condition&gt;</code> and <code>else</code> lines even in the cases where (a) there is no contained statement or (b) there is only a single statement!</li><li><strong>Braces and indentation</strong>. The placement of braces and statements must follow the standard rules for <a href="#braces">braces and indentation</a>.</li><li><strong>Final brace followed by a single blank line</strong>. The <em>final</em> right brace of the <code>if</code>-<code>else</code> must be followed by a blank line in most cases (the exception given below). This may be the final brace of the <code>if</code> compound statement if the <code>else</code> keyword is not present. Or it may be the the final brace of the <code>else</code> compound statement if present. A blank line never follows the right brace closing the <code>if</code> compound statement if the <code>else</code> keyword is present. Use of braces must follow all other standard rules for <a href="#braces">braces and spacing</a>.</li><li><strong>Exception</strong>. That blank line must also be omitted for certain cases where the <code>if &lt;condition&gt;</code>-<code>else</code> statement is nested within another compound statement; there should be no blank lines between consecutive right braces as discussed in the standard rules for use of <a href="#braces">braces</a>.</li></ul><p><strong>Other Applicable Coding Standards</strong>. See sections related to <a href="#braces">use of braces</a> and <a href="#indentation">indentation</a>.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if(var1 &lt; var2) var1 = var2;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if(var &gt; 0)</span></span>
<span class="line"><span>  var--;</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>  var = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (var1 &gt; 0) {</span></span>
<span class="line"><span>  var1--;</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>  var1 = 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var2 = var1;</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (var1 &lt; var2)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    var1 = var2;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (var &gt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    var--;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    var = 0;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (var1 &gt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    var1--;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    var1 = 0;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var2 = var1;</span></span></code></pre></div><p><strong>Ternary operator</strong> (<code>&lt;condition&gt; ? &lt;then&gt; : &lt;else&gt;</code>):</p><ul><li><strong>Only if the expression is short</strong>. Use of this form is only appropriate if the entire sequence is short and fits neatly on the line.</li><li><strong>Multiple lines forbidden</strong>. This form is forbidden if it extends to more than one line.</li><li><strong>Use of parentheses</strong>. The condition and the entire sequence are often enclosed in parentheses. These are, however, not required if the expressions evaluate properly without them.</li></ul><p><strong>Other Applicable Coding Standards</strong>. See sections related to <a href="#parentheses">parentheses</a>.</p><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int arg1 = arg2 &gt; arg3 ? arg2 : arg3;</span></span>
<span class="line"><span>int arg1 = ((arg2 &gt; arg3) ? arg2 : arg3);</span></span></code></pre></div><h3 id="switch-statement" tabindex="-1"><code>switch</code> Statement <a class="header-anchor" href="#switch-statement" aria-label="Permalink to &quot;\`switch\` Statement&quot;">​</a></h3><p><strong>Definitions:</strong></p><ul><li><strong>Case logic</strong>. By <em>case logic</em> it is mean the <code>case</code> or <code>default</code> and all of the lines of code following the <code>case</code> or <code>default</code> up to the next <code>case</code>, <code>default</code>, or the right brace indicating the end of the switch statement.</li></ul><p><strong>Coding Standard:</strong></p><ul><li><code>switch</code> <strong>separated from</strong> <code>&lt;value&gt;</code>. The <code>switch</code> keyword and the switch <code>&lt;value&gt;</code> must appear on the same line. The <code>if</code> keyword and the <code>&lt;value&gt;</code> must be separated by a single space.</li><li><strong>Falling through</strong>. Falling through a case statement into the next case statement is be permitted as long as a comment is included.</li><li><code>default</code> <strong>case</strong>. The <code>default</code> case should always be present and trigger an error if it is reached when it should not be.</li><li><strong>Case logic in braces</strong>. It is preferable that all <em>case logic</em> (except for the <code>break</code>) be enclosed in braces. If you need to instantiate local variables in case logic, then that logic must be surrounded with braces.</li><li><code>break</code> <strong>outside of braces</strong>. <code>break</code> statements are normally indented by two spaces. When used conditionally with <em>case logic</em>, the placement of the break statement follows normal indentation rules.</li><li><strong>Case logic followed by a single blank line</strong>. A single blank line must separate the <em>case logic</em> and any following <code>case</code> or <code>default</code>. The should, however, be no blank lines between the <em>case logic</em> and the closing right brace.</li><li><strong>Switch followed by a single blank line</strong>. The final right brace that closes the <code>switch &lt;value&gt;</code> statement must be followed by a single blank line.</li><li><strong>Exception</strong>. That blank line must be omitted for certain cases where the <code>switch &lt;value&gt;</code> statement is nested within another compound statement; there should be no blank lines between consecutive right braces as discussed in the standard rules for use of <a href="#braces">braces</a>.</li></ul><p><strong>Other Applicable Coding Standards</strong>. See sections related to <a href="#braces">use of braces</a>, <a href="#indentation">indentation</a>, and <a href="#comments">comments</a>.</p><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>switch (...)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    case 1:  /* Example of a comment following a case selector. */</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /* Example of a comment preceding a case selector. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    case 2:</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        /* Example of comment following the case selector. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        int value;</span></span>
<span class="line"><span>        ...</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    default:</span></span>
<span class="line"><span>      break;</span></span>
<span class="line"><span>  }</span></span></code></pre></div><h3 id="while-statement" tabindex="-1"><code>while</code> Statement <a class="header-anchor" href="#while-statement" aria-label="Permalink to &quot;\`while\` Statement&quot;">​</a></h3><p><strong>Coding Standard:</strong></p><ul><li><code>while</code> <strong>separated from</strong> <code>&lt;condition&gt;</code>. The <code>while</code> keyword and the <code>&lt;condition&gt;</code> must appear on the same line. The <code>while</code> keyword and the <code>&lt;condition&gt;</code> must be separated by a single space.</li><li><strong>Keywords on separate lines</strong>. <code>while &lt;condition&gt;</code> must lie on a separate line with nothing else present on the line.</li><li><strong>Indentation and parentheses</strong>. <code>while &lt;condition&gt;</code> follows the standard indentation and parentheses rules.</li><li><strong>Statements enclosed in braces</strong> Statement(s) following the <code>while &lt;condition&gt;</code> must always be enclosed in braces, even if only a single statement follows.</li><li><strong>No braces on null statements</strong>. No braces are required if no statements follow the <code>while &lt;condition&gt;</code>. The single semicolon (null statement) is sufficient;</li><li><strong>Braces and indentation</strong>. The placement of braces and statements must follow the standard rules for braces and indentation.</li><li><strong>Followed by a single blank line</strong>. The final right brace that closes the <code>while &lt;condition&gt;</code> statement must be followed by a single blank line.</li><li><strong>Exception</strong>. That blank line must be omitted for certain cases where the <code>while &lt;condition&gt;</code> statement is nested within another compound statement; there should be no blank lines between consecutive right braces as discussed in the standard rules for use of <a href="#braces">braces</a>.</li></ul><p><strong>Other Applicable Coding Standards</strong>. See sections related to <a href="#braces">use of braces</a>, <a href="#indentation">indentation</a>, and <a href="#comments">comments</a>.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>while( notready() )</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>ready = true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>while (*ptr != &#39;\\0&#39;) ptr++;</span></span></code></pre></div><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>while (notready());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ready = true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>while (*ptr != &#39;\\0&#39;)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    ptr++;</span></span>
<span class="line"><span>  }</span></span></code></pre></div><h3 id="do-while-statement" tabindex="-1"><code>do while</code> Statement <a class="header-anchor" href="#do-while-statement" aria-label="Permalink to &quot;\`do while\` Statement&quot;">​</a></h3><p><strong>Coding Standard:</strong></p><ul><li><strong>Keywords on separate lines</strong>. <code>do</code> and <code>while &lt;condition&gt;</code> must lie on separate lines with nothing else present on the line.</li><li><strong>Indentation and parentheses</strong>. <code>do .. while &lt;condition&gt;</code> follows the standard indentation and parentheses rules.</li><li><strong>Statements enclosed in braces</strong> Statement(s) following the <code>do</code> must always be enclosed in braces, even if only a single statement (or no statement) follows.</li><li><strong>Braces and indentation</strong>. The placement of braces and statements must follow the standard rules for braces and indentation.</li><li><code>while</code> <strong>separated from</strong> <code>&lt;condition&gt;</code>. The <code>while</code> keyword and the <code>&lt;condition&gt;</code> must appear on the same line. The <code>while</code> keyword and the <code>&lt;condition&gt;</code> must be separated by a single space.</li><li><strong>Followed by a single blank line</strong>. The concluding <code>while &lt;condition&gt;</code> must be followed by a single blank line.</li></ul><p><strong>Other Applicable Coding Standards</strong>. See sections related to <a href="#braces">use of braces</a>, <a href="#indentation">indentation</a>, and <a href="#comments">comments</a>.</p><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>do {</span></span>
<span class="line"><span>  ready = !notready();</span></span>
<span class="line"><span>} while (!ready);</span></span>
<span class="line"><span>senddata();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>do ptr++; while (*ptr != &#39;\\0&#39;);</span></span></code></pre></div><p>Error</p><p>This is incorrect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>do</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    ready = !notready();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>while (!ready);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>senddata();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>do</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    ptr++;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>while (*ptr != &#39;\\0&#39;);</span></span></code></pre></div><h3 id="use-of-goto" tabindex="-1">Use of <code>goto</code> <a class="header-anchor" href="#use-of-goto" aria-label="Permalink to &quot;Use of \`goto\`&quot;">​</a></h3><p><strong>Coding Standard:</strong></p><ul><li><strong>Limited Usage of</strong> <code>goto</code>. All use of the <code>goto</code> statement is prohibited except for one usage: for handling error conditions in complex, nested logic. A simple <code>goto</code> in those conditions can greatly improve the readability and complexity of the code.</li><li><strong>Label Naming</strong>. Labels must all lower case. The underscore character <code>_</code> is permitted to break up long labels.</li><li><strong>Error Exit Labels</strong>. The error exit label is normally called <code>errout</code>. Multiple error labels are often to required to <em>unwind</em> to recover resources committed in logic prior to the error to otherwise <em>undo</em> preceding operations. Naming for these other labels would be some like <code>errout_with_allocation</code>, <code>errout_with_openfile</code>, etc.</li><li><strong>Label Positioning</strong>. Labels are never indented. Labels must always begin in column 1.</li></ul><p>Tip</p><p>This is correct</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FAR struct some_struct_s *ptr;</span></span>
<span class="line"><span>int fd;</span></span>
<span class="line"><span>int ret;</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (arg == NULL)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    ret = -EINVAL;</span></span>
<span class="line"><span>    goto errout;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>ptr = malloc(sizeof(struct some_struct_s));</span></span>
<span class="line"><span>if (!ptr)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    ret = -ENOMEM;</span></span>
<span class="line"><span>    goto errout;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>fd = open(filename, O_RDONLY);</span></span>
<span class="line"><span>if (fd &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    errcode = -errno;</span></span>
<span class="line"><span>    DEBUGASSERT(errcode &gt; 0);</span></span>
<span class="line"><span>    goto errotout_with_alloc;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>ret = readfile(fd);</span></span>
<span class="line"><span>if (ret &lt; 0)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    goto errout_with_openfile;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>errout_with_openfile:</span></span>
<span class="line"><span>close(fd);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>errout_with_alloc:</span></span>
<span class="line"><span>free(ptr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>error:</span></span>
<span class="line"><span>return ret;</span></span></code></pre></div><p><strong>NOTE</strong>: See the discussion of <a href="#farnear">pointers</a> for information about the <code>FAR</code> qualifier used above.</p><h2 id="c" tabindex="-1">C++ <a class="header-anchor" href="#c" aria-label="Permalink to &quot;C++&quot;">​</a></h2><p>There is no existing document that provides a complete coding standard for NuttX C++ files. This section is included here to provide some minimal guidance in C++ code development. In most details like indentation, spacing, and file organization, it is identical to the C coding standard. But there are significant differences in the acceptable standard beyond that. The primary differences are as follows:</p><p>C++ style comments are not only permissible but are required (other than for the following exception). This includes the block comments of in the <em>Source File Structure</em> described in an <a href="#appndxa">Appendix</a> to this standard.</p><p>Deoxygen tags are acceptable. As are C style comments when needed to provide DOxygen tags.</p><p>There is currently no requirement to conform any specific C++ version. However, for portability reasons, conformance to older, pre-C++11 standards is encouraged where reasonable.</p><p>C++ file name extensions: The extension <code>.cxx</code> is used for C++ source files; the extension <code>.hxx</code> is used for C++ header files.</p><p>All naming must use <em>CamelCase</em>. Use of the underbar character, &#39;_&#39; is discouraged. This includes variables, classes, structures, ..., etc.: All user-nameable C++ elements. Pre-processor definitions are still required to be all upper case.</p><p>Local variable, method names, and function names must all begin with a lower case letter. As examples, <code>myLocalVariable</code> would be a compliant name for a local variable; <code>myMethod</code> would be a compliant name for a method;</p><p>Namespaces, global variable, class, structure, template, and enumeration names begin with a capital letter identifying what is being named:</p><blockquote><p><em>Namespace Names</em></p><p>: Namespaces begin with an upper case character but no particular character is specified. As an example, <code>MyNamespace</code> is fully compliant.</p><p><em>Global Variable Names</em></p><p>: Global variables and singletons begin with an upper case &#39;<strong>G</strong>&#39;. For example, <code>GMyGlobalVariable</code>. The prefix <code>g_</code> is never used.</p><p><em>Implementation Class Names</em></p><p>: Classes that implement methods begin with an upper case &#39;<strong>C</strong>&#39;. For example, <code>CMyClass</code>. A fully qualified method of <code>CMyClass</code> could be <code>MyNamespace::CMyClass::myMethod</code></p><p><em>Pure Virtual Base Class Names</em></p><p>: Such base classes begin with an upper case &#39;<strong>I</strong>&#39;. For example, <code>IMyInterface</code>.</p><p><em>Template Class Names</em></p><p>: Template classes begin with an upper case &#39;<strong>T</strong>&#39;. For example, <code>TMyTemplate</code>.</p><p><em>\`\`typedef\`\`&#39;d Type Names</em></p><p>: Currently all such types also begin with an upper case &#39;<strong>T</strong>&#39;. That probably needs some resolution to distinguish for template names. The suffix <code>_t</code> is never used.</p><p><em>Structure Names</em></p><p>: Structures begin with an upper case &#39;<strong>S</strong>&#39;. For example, <code>SMyStructure</code>. The suffix <code>_s</code> is never used.</p><p><em>Enumerations Names</em></p><p>: Enumerations begin with an upper case &#39;<strong>E</strong>&#39;. For example, <code>EMyEnumeration</code>. The suffix <code>_e</code> is never used.</p></blockquote><h2 id="using-pre-commit" tabindex="-1">Using Pre-Commit <a class="header-anchor" href="#using-pre-commit" aria-label="Permalink to &quot;Using Pre-Commit&quot;">​</a></h2><p>You can use the <a href="https://pre-commit.com/" target="_blank" rel="noreferrer">pre-commit</a> tool to check for style issues automatically. This is a 3rd party, Python based tool that simplifies linter checks and runs automatically when you commit modifications.</p><p>The tool uses the [.pre-commit-config.yaml]{.title-ref} file on the root NuttX directory as reference.</p><h3 id="installing" tabindex="-1">Installing <a class="header-anchor" href="#installing" aria-label="Permalink to &quot;Installing&quot;">​</a></h3><p>Follow the installation guide on <a href="https://pre-commit.com/" target="_blank" rel="noreferrer">pre-commit</a> website. If you can&#39;t install directly with pip, consider using <a href="https://snapcraft.io/install/pre-commit/ubuntu" target="_blank" rel="noreferrer">snap</a> or [apt]{.title-ref}. Then, enter the NuttX repository and run: <code>pre-commit install</code>.</p><h3 id="using" tabindex="-1">Using <a class="header-anchor" href="#using" aria-label="Permalink to &quot;Using&quot;">​</a></h3><p>When committing changes, the tool should run automatically. Each check should show &quot;Passed&quot;, otherwise the commit will not happen. If any test fails, you should: fix the errors, then <code>git add</code> and <code>git commit</code> again.</p><p>Example terminal output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>user@machine:~/nuttxspace/nuttx git commit -m &quot;Testing pre-commit&quot;</span></span>
<span class="line"><span>fix end of files.........................................................Passed</span></span>
<span class="line"><span>trim trailing whitespace.................................................Passed</span></span>
<span class="line"><span>check for added large files..............................................Passed</span></span>
<span class="line"><span>nxstyle..................................................................Passed</span></span>
<span class="line"><span>[feature/example_wifi 8394e9f3cf] Testing pre-commit</span></span>
<span class="line"><span>1 file changed, 1 insertion(+)</span></span></code></pre></div><p>It is possible to manually run the tool without a commit, just checking all files in a directory. Simply run: <code>pre-commit run --files drivers/i2c/*</code></p><h3 id="hooks" tabindex="-1">Hooks <a class="header-anchor" href="#hooks" aria-label="Permalink to &quot;Hooks&quot;">​</a></h3><p>The following hooks are enabled in \`.pre-commit-config.yaml\`:</p><ul><li><strong>end-of-file-fixer:</strong> adds an empty line at the end of the file.</li><li><strong>trailing-whitespace:</strong> finds and removes white spaces at the end of lines.</li><li><strong>check-added-large-files:</strong> verifies if large files were added to the commit.</li><li><strong>cmake-format:</strong> check the style of CMakeLists files.</li><li><strong>nxstyle:</strong> check for the NuttX style (nxstyle). Currently runs the entire <code>checkpatch.sh</code> script.</li></ul><h2 id="appendix" tabindex="-1">Appendix <a class="header-anchor" href="#appendix" aria-label="Permalink to &quot;Appendix&quot;">​</a></h2><h3 id="c-source-file-structure" tabindex="-1">C Source File Structure <a class="header-anchor" href="#c-source-file-structure" aria-label="Permalink to &quot;C Source File Structure&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * &lt;Relative path to the file&gt;</span></span>
<span class="line"><span> * &lt;Optional one line file description&gt;</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Licensed to the Apache Software Foundation (ASF) under one or more</span></span>
<span class="line"><span> * contributor license agreements.  See the NOTICE file distributed with</span></span>
<span class="line"><span> * this work for additional information regarding copyright ownership.  The</span></span>
<span class="line"><span> * ASF licenses this file to you under the Apache License, Version 2.0 (the</span></span>
<span class="line"><span> * &quot;License&quot;); you may not use this file except in compliance with the</span></span>
<span class="line"><span> * License.  You may obtain a copy of the License at</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> *   http://www.apache.org/licenses/LICENSE-2.0</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Unless required by applicable law or agreed to in writing, software</span></span>
<span class="line"><span> * distributed under the License is distributed on an &quot;AS IS&quot; BASIS, WITHOUT</span></span>
<span class="line"><span> * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the</span></span>
<span class="line"><span> * License for the specific language governing permissions and limitations</span></span>
<span class="line"><span> * under the License.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> ****************************************************************************/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Included Files</span></span>
<span class="line"><span> ****************************************************************************/</span></span></code></pre></div><p><em>All header files are included here.</em></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Pre-processor Definitions</span></span>
<span class="line"><span> ****************************************************************************/</span></span></code></pre></div><p><em>All C pre-processor macros are defined here.</em></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Private Types</span></span>
<span class="line"><span> ****************************************************************************/</span></span></code></pre></div><p><em>Any types, enumerations, structures or unions used by the file are defined here.</em></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Private Function Prototypes</span></span>
<span class="line"><span> ****************************************************************************/</span></span></code></pre></div><p><em>Prototypes of all static functions in the file are provided here.</em></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Private Data</span></span>
<span class="line"><span> ****************************************************************************/</span></span></code></pre></div><p><em>All static data definitions appear here.</em></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Public Data</span></span>
<span class="line"><span> ****************************************************************************/</span></span></code></pre></div><p><em>All data definitions with global scope appear here.</em></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Private Functions</span></span>
<span class="line"><span> ****************************************************************************/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Name: &lt;Static function name&gt;</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Description:</span></span>
<span class="line"><span> *   Description of the operation of the static function.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Input Parameters:</span></span>
<span class="line"><span> *   A list of input parameters, one-per-line, appears here along with a</span></span>
<span class="line"><span> *   description of each input parameter.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Returned Value:</span></span>
<span class="line"><span> *   Description of the value returned by this function (if any),</span></span>
<span class="line"><span> *   including an enumeration of all possible error values.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Assumptions/Limitations:</span></span>
<span class="line"><span> *   Anything else that one might need to know to use this function.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> ****************************************************************************/</span></span></code></pre></div><p><em>All static functions in the file are defined in this grouping. Each is preceded by a function header similar to the above.</em></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Public Functions</span></span>
<span class="line"><span> ****************************************************************************/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Name: &lt;Global function name&gt;</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Description:</span></span>
<span class="line"><span> *   Description of the operation of the function.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Input Parameters:</span></span>
<span class="line"><span> *   A list of input parameters, one-per-line, appears here along with a</span></span>
<span class="line"><span> *   description of each input parameter.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Returned Value:</span></span>
<span class="line"><span> *   Description of the value returned by this function (if any),</span></span>
<span class="line"><span> *   including an enumeration of all possible error values.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Assumptions/Limitations:</span></span>
<span class="line"><span> *   Anything else that one might need to know to use this function.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> ****************************************************************************/</span></span></code></pre></div><p><em>All global functions in the file are defined here.</em></p><h3 id="c-header-file-structure" tabindex="-1">C Header File Structure <a class="header-anchor" href="#c-header-file-structure" aria-label="Permalink to &quot;C Header File Structure&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span>* &lt;Relative path to the file&gt;</span></span>
<span class="line"><span>* &lt;Optional one line file description&gt;</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>* Licensed to the Apache Software Foundation (ASF) under one or more</span></span>
<span class="line"><span>* contributor license agreements.  See the NOTICE file distributed with</span></span>
<span class="line"><span>* this work for additional information regarding copyright ownership.  The</span></span>
<span class="line"><span>* ASF licenses this file to you under the Apache License, Version 2.0 (the</span></span>
<span class="line"><span>* &quot;License&quot;); you may not use this file except in compliance with the</span></span>
<span class="line"><span>* License.  You may obtain a copy of the License at</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>*   http://www.apache.org/licenses/LICENSE-2.0</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>* Unless required by applicable law or agreed to in writing, software</span></span>
<span class="line"><span>* distributed under the License is distributed on an &quot;AS IS&quot; BASIS, WITHOUT</span></span>
<span class="line"><span>* WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the</span></span>
<span class="line"><span>* License for the specific language governing permissions and limitations</span></span>
<span class="line"><span>* under the License.</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>****************************************************************************/</span></span></code></pre></div><p><em>Header file</em> <a href="#idempotence">idempotence</a> <em>definitions go here</em></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span>* Included Files</span></span>
<span class="line"><span>****************************************************************************/</span></span></code></pre></div><p><em>All header files are included here.</em></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span>* Pre-processor Definitions</span></span>
<span class="line"><span>****************************************************************************/</span></span></code></pre></div><p><em>All C pre-processor macros are defined here.</em></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span>* Public Types</span></span>
<span class="line"><span>****************************************************************************/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ifndef __ASSEMBLY__</span></span></code></pre></div><p><em>Any types, enumerations, structures or unions are defined here.</em></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span>* Public Data</span></span>
<span class="line"><span>****************************************************************************/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ifdef __cplusplus</span></span>
<span class="line"><span>#define EXTERN extern &quot;C&quot;</span></span>
<span class="line"><span>extern &quot;C&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>#else</span></span>
<span class="line"><span>#define EXTERN extern</span></span>
<span class="line"><span>#endif</span></span></code></pre></div><p><em>All data declarations with global scope appear here, preceded by the definition</em> <code>EXTERN</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Inline Functions</span></span>
<span class="line"><span> ****************************************************************************/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Name: &lt;Inline function name&gt;</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Description:</span></span>
<span class="line"><span> *   Description of the operation of the inline function.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Input Parameters:</span></span>
<span class="line"><span> *   A list of input parameters, one-per-line, appears here along with a</span></span>
<span class="line"><span> *   description of each input parameter.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Returned Value:</span></span>
<span class="line"><span> *   Description of the value returned by this function (if any),</span></span>
<span class="line"><span> *   including an enumeration of all possible error values.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Assumptions/Limitations:</span></span>
<span class="line"><span> *   Anything else that one might need to know to use this function.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> ****************************************************************************/</span></span></code></pre></div><p><em>Any static inline functions may be defined in this grouping. Each is preceded by a function header similar to the above.</em></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span>* Public Function Prototypes</span></span>
<span class="line"><span>****************************************************************************/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span>* Name: &lt;Global function name&gt;</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>* Description:</span></span>
<span class="line"><span>*   Description of the operation of the function.</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>* Input Parameters:</span></span>
<span class="line"><span>*   A list of input parameters, one-per-line, appears here along with a</span></span>
<span class="line"><span>*   description of each input parameter.</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>* Returned Value:</span></span>
<span class="line"><span>*   Description of the value returned by this function (if any),</span></span>
<span class="line"><span>*   including an enumeration of all possible error values.</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>* Assumptions/Limitations:</span></span>
<span class="line"><span>*   Anything else that one might need to know to use this function.</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>****************************************************************************/</span></span></code></pre></div><p><em>All global functions in the file are prototyped here. The keyword</em><code>extern</code> <em>or the definition</em> <code>EXTERN</code> <em>are never used with function prototypes.</em></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#undef EXTERN</span></span>
<span class="line"><span>#ifdef __cplusplus</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#endif /* __INCLUDE_ASSERT_H */</span></span></code></pre></div><p>Ending with the header <a href="#idempotence">idempotence</a> <code>#endif</code>.</p>`,459)]))}const g=s(t,[["render",p]]);export{u as __pageData,g as default};
