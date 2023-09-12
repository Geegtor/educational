console.log('Hello Mthrfckrs!');

class StackNode{
    constructor(value) {
        this.value = value;
        this.n = 0;
    }
}

console.log('Is ht all good down htere?');

class Stack{
    constructor() {
        this.root = null; 
        this.n = 0; 
    }

    isEmpty() {
        return this.n === 0;
    }

    size() {
        return this.n;
    }

    push(value) {
        var oldFirst = this.root;
        this.root = new StackNode(value);
        this.root.next = oldFirst;
        this.n++;
    }

    pop() {
        if (this.isEmpty()) return null;
        var OldFirst = this.root;
        this.root = oldFirst.next;
        this.n--;
        return oldFirst.value;
    }
}
