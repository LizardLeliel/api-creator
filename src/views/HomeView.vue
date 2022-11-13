<script setup lang="ts">

</script>

<template>
  <main>
    <h1> Welcome to the Rapid Prototype API Creator! </h1>

    <p>
      It can be quite a bit to setup an API for very basic use cases, setting up a database and then the server to accept all the get and post requests and such.
      Wouldn't it be easy to configure all that from a browser?
    </p>

    <p>
      So with that, this website represents a UI for a theoritical service where you can create Schemas, data instances of Schemas, and various api actions used to modify them!
    </p>

    <p>
      That being said, not only is this website a work in progress, there is no backend currently. On top of that, the purpose behind this is to learn and practice Vue
      with a real-world application - however, I would like to develop this idea further into something practical.
    </p>
    <p>
      Focus is put into implementing schemas. "Objects" and especially "Actions" may not be implemented for a long while, since after Schemas are complete, I feel like I have achieved my 
      goal of learning Vue - I'd be repeating what I've already done implementing those instead of doing new problems.
    </p>

    <h2> Stuff I want to point out</h2>
    <ul>
      <li> If you're editing a schema's field's description and want to go to any other page, you will be asked about unsaved changes. </li> 
      <li> You can't save a new field/Schema if the form is invalid. Invalid-feedback will be displayed for invalid names after the input was modified from the default state. </li>
      <li> If you're editing a schema's field's description, you can't click "save" unless the text has changed. </li>
      <li> Any change values in Schemas and their fields be tracked between page changes and displayed correctly. </li>
      <li> Opening a modal will show an opacity animation (which is exaggerated so it can be noticed.) </li>
    </ul>
  </main>
</template>
