function initButtonImprimer() {
  var bouton = document.getElementById('button-imprimer');
  bouton.onclick = function(e) {
    print();
    return false;
  }
}
