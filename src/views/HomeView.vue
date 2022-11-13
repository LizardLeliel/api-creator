<script setup lang="ts">

</script>

<template>
  <main>
    <h1> Welcome to the Rapid Prototype API Creator! </h1>

    <p>
      It can be quite a bit to setup an API for very basic use cases. You have to set up a database and then write the server 
      to accept all the get and post requests and such, despite how simple they are. Wouldn't it be easy to configure all 
      that from a browser so you can test an idea?
    </p>

    <p>   
      This website represents a UI for a theoritical service where you can create Schemas, instances of Schemas,
      and the various api actions used to modify them! It would take care of simple use-case server-side validation too.
    </p>

    <p>
      That being said, not only is this website a work in progress, there is no backend currently. On top of that, 
      the purpose behind this was to learn/practice Vude and present a demonstration of said skill. That being said, 
      I do want to develop this idea until something that can be useful and practical.
    </p>

    <p>
      So far, only Schemas are implemented in limited capacity.
    </p>

    <h2> Stuff I want to point out </h2>
    <ul>
      <li> If you're editing a schema's field's description and want to go to any other page, you will be asked about unsaved changes. </li> 
      <li> You can't save a new field/Schema if the form is invalid. Invalid-feedback will be displayed for invalid names after the input was modified from the default state. </li>
      <li> If you're editing a schema's field's description, you can't click "save" unless the text has changed. </li>
      <li> Any change values in Schemas and their fields be tracked between page changes and displayed correctly. </li>
      <li> Opening a modal will show an opacity animation (which is exaggerated so it can be noticed.) </li>
    </ul>
  </main>
</template>
