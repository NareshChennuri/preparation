/*

First and foremost rule in ADA 
- it must be accessible, 
- means must be visible or audible and operable.

all users must be able to interact with the application using their preferred input method.

- must be understandable 
- must be clear and easy to use.

people with blind or have low vision 
- help them to go through the web content 
- it should be read aloud by screen readers.

- ensure proper HTML element structure 
  <h1> to <h6>
  Semantic tags (<nav> <header> <footer> <main>)

- Associate labels with form fields
  - using the <label> element or the aria-label and aria-labelledby attributes. 

- Add descriptive alt text to all images (<img> tags) to ensure that users with visual impairments can understand the content of the images through screen readers.

- focusable elements
- adding roles
- alt tags
- aria-labeldby


- check correct color-contrast
  - using Lighthouse
  - no-cofee and other online tools
  - chrome debugger tool

to make the notifications accessible by screenreaders or by keyboard

<div class="notification" aria-live="assertive">This is the notification!!</div>

------------------------------------------------

A11y (accessiblity) plugin, 
- light house plugin.
- no-cofee 
--------------------

accessibility tree?

Just like we have the DOM similarly we have the accessibility tree. We can see this tree in the firefox and Chrome debugger too. This helps the developer to see how the accessibility elements are getting added such as role, focusable, alt tag, aria-labeldby, etc.

accessibility of colors?

 there are. Lighthouse, no-coffee, many online websites to check correct color-contrast. As well as, for developers in the chrome debugger accessibility related to color is already integrated by default.

-----------------------

Tools such as AXE and Lighthouse are cross-browser supporting tools.

------------------


------------------

Give example of hidden, aria-hidden="true", role="presentation", and role="none"?

Though at a high level all 3 looks the same though there is a difference between all of three:

aria-hidden="true"
aria-hidden expects boolean values. When the value is true it means the element will be removed from the accessibility tree and ignored from the assistive technologies.

role="presentation" , role='none', and role=''
all are the same. They remove the semantic meaning from the elements. For example, if we are using LI to make a table then we can add role=" presentation/none". Assistive technologies will ignore the LI semantic and by using 'role' to represent the table.

Also, this won't work on the actionable, input, and focusable elements like buttons.

------------------------


-----------------------

ARIA stands for Accessible Rich Internet Application. ARIA is useful for screenreader users. It won't create any difference visually. There are many tags, states, and properties missing from the HTML tags. Also, there are many custom modules we make such as carousels, pagination, etc which are not defined in the HTML. These are impossible for screenreader users to understand.

ARIA provides information about such modules by defining the roles, properties, and states for screenreaders.

In short, ARIA is the bridge between missing information in HTML and screenreaders.

------------------------------
What is WAI-ARIA?

WAI-ARIA is a technology that can be used to add extra information about the structure and function of a page. This can be especially helpful for users with disabilities who are using assistive technologies.

WAI-ARIA is supported by most modern web browsers, and you can use it to add information such as labels, descriptions, and keyboard shortcuts.

When using WAI-ARIA, you should keep in mind that it is a supplemental technology. This means that it should be used in addition to other accessibility features, such as providing text alternatives for non-text content.

---------------------------

What is the WCAG?

The Web Content Accessibility Guidelines (WCAG) are a set of standards for making web content accessible to people with disabilities. The WCAG is developed by the World Wide Web Consortium (W3C), an international standards body.

There are three levels of conformance: A, AA, and AAA. The WCAG 2.0 standards are currently the most widely-used guidelines for accessible web design.

WCAG accessibility features include providing alt text for images and designing pages that can be navigated using only a keyboard.

By following the WCAG standards, web designers can help ensure that their content is accessible to everyone.

=----------------------------

the most important thing to keep in mind when making a website accessible is to ensure that all content is perceivable. 
This means that users must be able to see or hear the information on the page.

you can do this by providing text alternatives for non-text content, such as images or videos. 
You can also use color and contrast to make sure your content is visible, and choose fonts that are easy to read.

users must be able to interact with the page using their preferred input method like keyboad.

you should make sure that the information and user interface elements must be clear and easy to use, and compatible with assistive technologies. 

---------------------------------------

There are many methods for making web content accessible. Some of the most common include providing text alternatives for non-text content, using color and contrast to improve visibility, choosing fonts that are easy to read, and designing pages that can be navigated using the keyboard.

In addition, you can use WAI-ARIA to add extra information about the structure and function of your page. This can be especially helpful for users with disabilities who are using assistive technologies like screenreaders.

-------------------------------------------

for color blindness

There are a few different ways that you can test a website for color blindness.

One way is to use the Color Contrast Checker tool, which is available for free online. 
This tool lets you enter the URL of the website you want to test, and it will then generate a report that shows how well the site meets the contrast requirements for people with different types of color vision deficiency.

Another way to test a website for color blindness is to use a browser plugin like NoCoffee Vision Simulator. 
This plugin allows you to simulate what the site would look like to someone with a specific type of color vision deficiency, which can be very helpful in finding potential accessibility issues.

----------------------------------------------

While most website accessibility testing tools focus on visual impairments, it is also important to test for hearing impairments.

There are a few key ways to do this.

First, you can use a screen reader to test how well the website can be read aloud. 
This will help to identify any areas where text is not being properly read or where audio descriptions are missing.

Additionally, you can test the website's audio quality and volume levels to ensure that they are sufficient for users with hearing impairments.

-----------------------------------------------

There are a few different ways that you can test a website for low vision.

One method is to use a screen reader, which will read the text on the screen aloud. 
This can be helpful for people who have difficulty reading small print. 
Another method is to increase the font size or the contrast on the screen. 
This can make it easier to read text that is otherwise difficult to see.

-------------------------------------------------

for motor impairments?

One method is to use a screen reader, which will read out the text on the website as well as provide information about the structure of the page.

Another method is to use a keyboard navigation tool, which will allow you to move around the website without using a mouse.

also use a magnifier tool to enlarge the text and images on the website.

--------------------------------------------------

A screen reader is a software program that converts on-screen text into speech, making it possible for blind and visually impaired users to access digital information.

screen-readers and text-to-speech programs can be used to improve accessibility for individuals with vision impairments.

There are a number of different screen readers available on the market, but the most popular one is JAWS (Job Access With Speech). 
JAWS is available for both Windows and macOS. 
As well as reading on-screen text aloud, JAWS also provides various commands for navigating web pages and applications. 
It can be used with a variety of assistive technologies, such as Braille displays and refreshable Braille displays.

While JAWS is the most popular screen reader, there are a number of other options available, 
including NVDA (NonVisual Desktop Access), Windows Narrator, VoiceOver (built into MacOS) and Orca (built into Linux).


text-to-speech (TTS)

There are a variety of TTS programs available on the market, but the most popular is undoubtedly Natural Reader. Natural Reader offers a high-quality TTS engine that can convert text into natural-sounding speech in a variety of languages. In addition, it offers a wide range of customization options, allowing users to adjust the speed, pitch, and volume of the generated speech. Natural Reader also has a convenient mobile app, making it easy to listen to text on the go.

For all these reasons, Natural Reader is the clear choice for the most popular TTS program.

-----------------------------

The most common form of color blindness is red-green color blindness, which affects approximately 8 percent of men and 0.5 percent of women. People with this condition have trouble distinguishing between red and green, and may also have difficulty with other colors in the green-yellow-red spectrum.

there are a number of ways to make websites more accessible to people with this condition. For example, using high contrast color schemes can help to make text more readable, and avoiding the use of color as the sole means of conveying information can help to ensure that important information is not missed.

------------------------------

When designing for mobile accessibility, it is important to keep the following in mind:

Screen size: Make sure that the content can be seen and used on a small screen.

Touch screen: Make sure that the content can be used on a touch screen.

Internet connection: Make sure that the content can be loaded and used on a mobile device with a slower Internet connection.

Operating system: Make sure that the content can be used on a mobile device with a different operating system than a desktop computer.

How do you think accessibility testing on mobile devices is different from testing on desktop computers?
Accessibility testing on mobile devices is different from testing on desktop computers in a few key ways.

First, mobile devices have smaller screen sizes, which can make it more difficult to see and use web content.

Second, mobile devices typically have touch screens, which can make it more difficult to use certain types of input devices, such as keyboards and mice.

Third, mobile devices typically have slower Internet connections, which can make it more difficult to load and use web content.

Finally, mobile devices often have different operating systems and software than desktop computers, which can make it more difficult to use certain types of Assistive Technology.

*/