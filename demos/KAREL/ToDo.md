<body style="background-color: black; height: 100%; width: 100%;">
<h1 style="color: darkslategrey">Features To Do</h1>

[//]: # (#### Default template: ####)
<!-- start copy below line here
<h2 style="color:CornflowerBlue"></u> Main Feature Title </u></h3>
<ul style="font-size: medium; color:crimson">
  <li> 
    Functionality
    <ul style="color:Goldenrod">
      <li> 
      Reason: 
        <span style="color: #ddd">
        Text 
        </span>
      </li>
      <ul style="color:darkorange">
        <li> 
        Comment: 
          <span style="color: #888">
          Text.
          </span>
        </li>
      </ul>
    </ul>
  </li> 
</ul>
end copy above line here -->

<h2 style="color:CornflowerBlue"></u>Add main block to KAREL</u></h3>
<ul style="font-size: medium; color:crimson">
  <li> 
    Add a default main to KAREL workspace.
    <ul style="color:Goldenrod">
      <li> 
      Reason: 
        <span style="color: #ddd">
        Users do not have to get it from toolbox. 
        </span>
      </li>
    </ul>
  </li> 
  <li> 
    Remove main block from toolbox.
    <ul style="color:Goldenrod">
      <li> 
      Reason: 
        <span style="color: #ddd">
        Users cannot add a second main block.
        </span>
      </li>
    </ul>
  </li>
</ul>

<h2 style="color:CornflowerBlue"></u>Modify listener of workspace</u></h3>
<ul style="font-size: medium; color:crimson">
  <li> 
    Add function to check if blocks are being used correctly.
    <ul style="color:Goldenrod">
      <li> 
      Reason: 
        <span style="color: #ddd">
        Can expand functionality of listener without the need of additional listeners.
        </span>
      </li>
    </ul>
  </li> 
  <li> 
    Call workspace generator depending on current tab.
    <ul style="color:Goldenrod">
      <li> 
      Reason: 
        <span style="color: #ddd">
        Workspace needs to correctly generate code depending on current tab.
        </span>
      </li>
      <ul style="color:darkorange">
        <li> 
        Comment: 
          <span style="color: #888">
          Switch case that changes code generation depending on current tab.
          </span>
        </li>
      </ul>
    </ul>
  </li>
  <li> 
    Check if variables are declared before being used.
    <ul style="color:Goldenrod">
      <li> 
      Reason: 
        <span style="color: #ddd">
        Won't result in invalid code.
        </span>
      </li>
    </ul>
  </li>
</ul>

</body>
