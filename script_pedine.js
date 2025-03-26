document.addEventListener("DOMContentLoaded", function () {
    const pieces = [
        { id: "torre1", position: "cell-A-0" },
        { id: "alfiere1", position: "cell-A-1" },
        { id: "regina1", position: "cell-A-2" },
        { id: "re1", position: "cell-A-3" }
    ];

    // Posizionamento iniziale delle pedine
    pieces.forEach(piece => {
        const pieceElement = document.getElementById(piece.id);
        const cellElement = document.getElementById(piece.position);
        cellElement.appendChild(pieceElement);
    });

    // Abilita lo spostamento tramite clic
    let selectedPiece = null;

    document.querySelectorAll(".scacchiera td").forEach(cell => {
        cell.addEventListener("click", function () {
            if (selectedPiece) {
                // Se una pedina è già selezionata, spostala nella cella cliccata
                this.appendChild(selectedPiece);
                selectedPiece = null;
            } else if (this.children.length > 0) {
                // Se nella cella è presente una pedina, selezionala
                selectedPiece = this.children[0];
            }
        });
    });
});