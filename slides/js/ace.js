function editor(id) {
  var editor = ace.edit(id, {
    mode: "ace/mode/java",
    tabSize: 2,
    useSoftTabs: true,
    hasCssTransforms: true,
  });
}