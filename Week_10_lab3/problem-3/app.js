class Note {
    constructor(text, parent = null) {
      this.text = text;
      this.parent = parent;
      this.children = [];
    }
  
    addChild(childNote) {
      this.children.push(childNote);
      childNote.parent = this;
    }
  
    removeChild(childNote) {
      const index = this.children.indexOf(childNote);
      if (index !== -1) {
        this.children.splice(index, 1);
        childNote.parent = null;
      }
    }
  
    delete() {
      if (this.parent) {
        this.parent.removeChild(this);
      }
      // Additional deletion logic if needed
    }
  }
  
  // Example usage:
  const topLevelNote1 = new Note("Top-level note 1");
  
  const topLevelNote2 = new Note("Top-level note 2");
  const childNote1 = new Note("Child note 1", topLevelNote2);
  const childNote2 = new Note("Child note 2", topLevelNote2);
  
  topLevelNote2.addChild(childNote1);
  topLevelNote2.addChild(childNote2);
  
  console.log(topLevelNote2.children.length); // Output: 2
  
  // Deleting the parent note (topLevelNote2)
  topLevelNote2.delete();
  
  console.log(topLevelNote2.children.length); // Output: 0
  console.log(childNote1.parent); // Output: null (since parent is deleted)
  console.log(childNote2.parent); // Output: null (since parent is deleted)
  