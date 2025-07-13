const cursos = [
  // Semestre 1
  { nombre: "Data Analytics I (Excel)", semestre: 1, aprobado: false, prerequisitos: [], creditos: 5, tipo: 'matematicas' },
  { nombre: "Álgebra Lineal", semestre: 1, aprobado: false, prerequisitos: [], creditos: 5, tipo: 'matematicas' },
  { nombre: "Cálculo I", semestre: 1, aprobado: false, prerequisitos: [], creditos: 5, tipo: 'matematicas' },
  { nombre: "Principles of Economics", semestre: 1, aprobado: false, prerequisitos: [], creditos: 5, tipo: 'economia' },
  { nombre: "Entrepreneurship & Innovation", semestre: 1, aprobado: false, prerequisitos: [], creditos: 5 },
  { nombre: "Business English I", semestre: 1, aprobado: false, prerequisitos: [], creditos: 3 },
  { nombre: "Pensamiento Crítico en Economía", semestre: 1, aprobado: false, prerequisitos: [], creditos: 5 },
  { nombre: "Teología I", semestre: 1, aprobado: false, prerequisitos: [], creditos: 3 },

  // Semestre 2
  { nombre: "Data Analytics II (Programación)", semestre: 2, aprobado: false, prerequisitos: ["Data Analytics I (Excel)"], creditos: 5, tipo: 'matematicas' },
  { nombre: "Optimización", semestre: 2, aprobado: false, prerequisitos: ["Álgebra Lineal"], creditos: 5, tipo: 'matematicas' },
  { nombre: "Cálculo II", semestre: 2, aprobado: false, prerequisitos: ["Cálculo I"], creditos: 5, tipo: 'matematicas' },
  { nombre: "Principles of Microeconomics", semestre: 2, aprobado: false, prerequisitos: ["Principles of Economics"], creditos: 5, tipo: 'economia' },
  { nombre: "Excel II", semestre: 2, aprobado: false, prerequisitos: ["Data Analytics I (Excel)"], creditos: 2, tipo: 'matematicas' },
  { nombre: "Business English II", semestre: 2, aprobado: false, prerequisitos: ["Business English I"], creditos: 3 },
  { nombre: "PEG 1", semestre: 2, aprobado: false, prerequisitos: [], creditos: 3 },

  // Semestre 3
  { nombre: "Data Analytics III", semestre: 3, aprobado: false, prerequisitos: ["Data Analytics II (Programación)"], creditos: 5, tipo: 'matematicas' },
  { nombre: "Estadísticas I", semestre: 3, aprobado: false, prerequisitos: ["Cálculo II"], creditos: 5, tipo: 'matematicas' },
  { nombre: "Microeconomics I", semestre: 3, aprobado: false, prerequisitos: ["Principles of Microeconomics"], creditos: 5, tipo: 'economia' },
  { nombre: "Contabilidad I", semestre: 3, aprobado: false, prerequisitos: [], creditos: 5 },
  { nombre: "Global Business Environments", semestre: 3, aprobado: false, prerequisitos: [], creditos: 5, tipo: 'internacional' },
  { nombre: "Business English III", semestre: 3, aprobado: false, prerequisitos: ["Business English II"], creditos: 3 },
  { nombre: "Antropología Filosófica", semestre: 3, aprobado: false, prerequisitos: [], creditos: 3 },
  { nombre: "Minor I", semestre: 3, aprobado: false, prerequisitos: [], creditos: 4 },

  // Semestre 4
  { nombre: "Estadísticas II", semestre: 4, aprobado: false, prerequisitos: ["Estadísticas I"], creditos: 5, tipo: 'matematicas' },
  { nombre: "Macroeconomics I", semestre: 4, aprobado: false, prerequisitos: ["Microeconomics I"], creditos: 5, tipo: 'economia' },
  { nombre: "Contabilidad II", semestre: 4, aprobado: false, prerequisitos: ["Contabilidad I"], creditos: 5 },
  { nombre: "Marketing I", semestre: 4, aprobado: false, prerequisitos: [], creditos: 5 },
  { nombre: "Business English IV", semestre: 4, aprobado: false, prerequisitos: ["Business English III"], creditos: 3 },
  { nombre: "Teología II", semestre: 4, aprobado: false, prerequisitos: ["Teología I"], creditos: 3 },
  { nombre: "Minor II", semestre: 4, aprobado: false, prerequisitos: ["Minor I"], creditos: 4 },
  { nombre: "Ética General", semestre: 4, aprobado: false, prerequisitos: [], creditos: 3 },

  // Semestre 5
  { nombre: "Macroeconomics II", semestre: 5, aprobado: false, prerequisitos: ["Macroeconomics I"], creditos: 5, tipo: 'economia' },
  { nombre: "Financial Analysis", semestre: 5, aprobado: false, prerequisitos: ["Contabilidad II"], creditos: 5 },
  { nombre: "Latin American Business & Politics", semestre: 5, aprobado: false, prerequisitos: ["Global Business Environments"], creditos: 5, tipo: 'internacional' },
  { nombre: "Dynamic Global Forces", semestre: 5, aprobado: false, prerequisitos: [], creditos: 5, tipo: 'internacional' },
  { nombre: "Minor III", semestre: 5, aprobado: false, prerequisitos: ["Minor II"], creditos: 4 },

  // Semestre 6
  { nombre: "International Trade", semestre: 6, aprobado: false, prerequisitos: ["Macroeconomics II"], creditos: 5, tipo: 'internacional' },
  { nombre: "Corporate Finance", semestre: 6, aprobado: false, prerequisitos: ["Financial Analysis"], creditos: 5 },
  { nombre: "People Development", semestre: 6, aprobado: false, prerequisitos: [], creditos: 5 },

  // Semestre 7
  { nombre: "International Finance", semestre: 7, aprobado: false, prerequisitos: ["Corporate Finance"], creditos: 5, tipo: 'internacional' },
  { nombre: "Supply Chain Management", semestre: 7, aprobado: false, prerequisitos: [], creditos: 5 },

  // Semestre 8
  { nombre: "Comparative International Law", semestre: 8, aprobado: false, prerequisitos: [], creditos: 5, tipo: 'internacional' },
  { nombre: "Optativo Teológico", semestre: 8, aprobado: false, prerequisitos: ["Teología II"], creditos: 3 }
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
