class Node {
    constructor(row, col, data) {
        this.row = row;
        this.col = col;
        this.data = data;
        this.next = null;
    }
}

class Sparse {
    constructor() {
        this.head = null;
        this.temp = null;
        this.size = 0;
    }

    len() {
        return this.size;
    }

    isempty() {
        return this.size === 0;
    }

    create_new_node(row, col, data) {
        let newNode = new Node(row, col, data);

        if (this.isempty()) {
            this.head = newNode;
        } else {
            this.temp.next = newNode;
        }
        this.temp = newNode;

        this.size += 1;
    }

    PrintList() {
        let temp = this.head;
        let rowPositions = [];
        let colPositions = [];
        let values = '';

        while (temp !== null) {
            rowPositions.push(temp.row);
            temp = temp.next;
        }

        temp = this.head;
        while (temp !== null) {
            colPositions.push(temp.col);
            temp = temp.next;
        }

        temp = this.head;
        while (temp !== null) {
            values += temp.data + ' ';
            temp = temp.next;
        }

        return {
            "row_position": rowPositions,
            "column_position": colPositions,
            "value": values.trim().split(' ').map(Number)
        };
    }
}

function processMatrix() {
    const matrixInput = document.getElementById('matrixInput').value;
    const matrixRows = matrixInput.trim().split('\n');

    const s = new Sparse();

    for (let i = 0; i < matrixRows.length; i++) {
        const rowData = matrixRows[i].trim().split(' ').map(Number);
        for (let j = 0; j < rowData.length; j++) {
            if (rowData[j] !== 0) {
                s.create_new_node(i, j, rowData[j]);
            }
        }
    }

    const output = s.PrintList();
    document.getElementById('output').innerText = JSON.stringify(output, null, 2);
}
