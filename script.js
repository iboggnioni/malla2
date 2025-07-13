const cursos = [
  { nombre: "Cálculo I", semestre: 1, aprobado: false, prerequisitos: [], creditos: 5, tipo: 'matematicas' },
  { nombre: "Álgebra Lineal", semestre: 1, aprobado: false, prerequisitos: [], creditos: 5, tipo: 'matematicas' },
  { nombre: "Principles of Economics", semestre: 1, aprobado: false, prerequisitos: [], creditos: 5, tipo: 'economia' },
  { nombre: "Cálculo II", semestre: 2, aprobado: false, prerequisitos: ["Cálculo I"], creditos: 5, tipo: 'matematicas' },
  { nombre: "Principles of Microeconomics", semestre: 2, aprobado: false, prerequisitos: ["Principles of Economics"], creditos: 5, tipo: 'economia' },
  { nombre: "International Trade", semestre: 3, aprobado: false, prerequisitos: ["Principles of Microeconomics"], creditos: 5, tipo: 'internacional' }
];

const container = document.getElementById('malla-container');

function renderMalla() {
  container.innerHTML = '';
  const porSemestre = {};
  cursos.forEach(curso => {
    if (!porSemestre[curso.semestre]) porSemestre[curso.semestre] = [];
    porSemestre[curso.semestre].push(curso);
  });

  Object.keys(porSemestre).sort().forEach(sem => {
    const col = document.createElement('div');
    col.className = 'semestre';
    col.innerHTML = `<h2>Semestre ${sem}</h2>`;

    porSemestre[sem].forEach(curso => {
      const prereqsOk = curso.prerequisitos.every(pr => {
        const prCurso = cursos.find(c => c.nombre === pr);
        return prCurso && prCurso.aprobado;
      });

      const div = document.createElement('div');
      div.className = `curso ${curso.aprobado ? 'aprobado' : ''} ${curso.tipo || ''}`;
      div.innerHTML = `
        <strong>${curso.nombre}</strong><br>
        <small>${curso.creditos} créditos${curso.prerequisitos.length ? ' | Prerreq: ' + curso.prerequisitos.join(', ') : ''}</small><br>
        <label>
          <input type="checkbox" ${curso.aprobado ? 'checked' : ''} ${!prereqsOk ? 'disabled' : ''} 
          onchange="toggleAprobado(${cursos.indexOf(curso)})">
          Aprobado
        </label>
      `;
      col.appendChild(div);
    });
    container.appendChild(col);
  });
}

function toggleAprobado(index) {
  cursos[index].aprobado = !cursos[index].aprobado;
  renderMalla();
}

renderMalla();
