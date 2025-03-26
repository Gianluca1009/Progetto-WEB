let selectedPiece = null; // To store the currently selected piece
let selectedCell = null;  // To store the currently selected cell

// Function to handle selecting a piece
function selectPiece(pieceId) {
    // Deselect any previously selected piece
    if (selectedPiece !== null) {
        document.getElementById(selectedPiece).classList.remove("selected");
        clearValidMoves();
    }

    // Select the new piece
    selectedPiece = pieceId;
    document.getElementById(pieceId).classList.add("selected");

    // Show valid moves for the selected piece
    showValidMoves(pieceId);
}

// Function to show the valid moves for the selected piece
function showValidMoves(pieceId) {
    const piece = document.getElementById(pieceId);
    const pieceType = pieceId.split('1')[0]; // Assuming pieceId like 'torre1', 'alfiere1', etc.
    
    // Based on the piece type, determine the valid moves
    // Example: Show some basic moves for Torre (Rook)
    if (pieceType === 'torre') {
        highlightValidMoves([[1, 0], [-1, 0], [0, 1], [0, -1]]);
    }
    // Add more logic for other pieces (e.g., alfiere, regina, re)
    // For example, for a queen (regina), combine rook + bishop moves, etc.
}

// Function to highlight the valid moves
function highlightValidMoves(directions) {
    directions.forEach(([dx, dy]) => {
        for (let i = 1; i <= 6; i++) {
            const x = selectedCell[0] + dx * i;
            const y = selectedCell[1] + dy * i;
            
            if (x >= 0 && x < 6 && y >= 0 && y < 6) {
                const cell = document.getElementById(`cell-${x}-${y}`);
                if (cell) {
                    cell.classList.add('valid-move');
                }
            }
        }
    });
}

// Function to clear highlighted valid moves
function clearValidMoves() {
    const validMoves = document.querySelectorAll('.valid-move');
    validMoves.forEach(cell => {
        cell.classList.remove('valid-move');
    });
}

// Function to handle clicking on a cell (to move a piece)
function selectCell(i, j) {
    // If no piece is selected, do nothing
    if (selectedPiece === null) return;

    // Get the target cell
    const targetCell = document.getElementById(`cell-${i}-${j}`);
    if (targetCell.classList.contains('valid-move')) {
        movePiece(i, j);
    }
}

// Function to move the piece to the selected cell
function movePiece(i, j) {
    const piece = document.getElementById(selectedPiece);
    const targetCell = document.getElementById(`cell-${i}-${j}`);
    
    // Move the piece to the target cell
    targetCell.appendChild(piece);
    
    // Deselect the piece
    clearValidMoves();
    selectedPiece = null;
    piece.classList.remove("selected");
}
