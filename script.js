const keypad = document.getElementById('keypad-area');
const disp = document.getElementById('display');
const modeText = document.getElementById('mode-indicator');
const err = document.getElementById('error-msg');
let resetOnNext = false;

window.onload = renderStandard;

function triggerVibe()
{ 
    if (navigator.vibrate)
        navigator.vibrate(15); 
}

function add(v) 
{
    triggerVibe();

    if (resetOnNext && !isNaN(v))
        { 
            disp.value = ""; 
            resetOnNext = false; 
        }

    err.innerText = "";

    if (disp.value === "0") 
        disp.value = "";
    disp.value += v;
}

function solve() 
{
    triggerVibe();
    try 
    {
        let str = disp.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/sin\(/g, 'Math.sin(' + Math.PI / 180 + '*')
            .replace(/cos\(/g, 'Math.cos(' + Math.PI / 180 + '*')
            .replace(/tan\(/g, 'Math.tan(' + Math.PI / 180 + '*')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/√\(/g, 'Math.sqrt(');

        let res = eval(str);
        disp.value = Number.isInteger(res) ? res : parseFloat(res.toFixed(6));
        resetOnNext = true;
    } 

    catch
    {
        err.innerText = "SYNTAX ERROR";
        disp.value = "0";
    }
}

function renderStandard() 
{
    modeText.innerText = "COMP";
    keypad.innerHTML = `
        <button class="btn-sci" onclick="add('Math.PI')">π</button>
        <button class="btn-sci" onclick="add('**')">^</button>
        <button class="btn-sci" onclick="eng()">ENG</button>
        <button class="btn-mode" onclick="renderMenu()">...</button>
        
        <button class="btn-num" onclick="add('7')">7</button>
        <button class="btn-num" onclick="add('8')">8</button>
        <button class="btn-num" onclick="add('9')">9</button>
        <button class="btn-op" onclick="del()">DEL</button>
        
        <button class="btn-num" onclick="add('4')">4</button>
        <button class="btn-num" onclick="add('5')">5</button>
        <button class="btn-num" onclick="add('6')">6</button>
        <button class="btn-op" onclick="add('*')">×</button>
        
        <button class="btn-num" onclick="add('1')">1</button>
        <button class="btn-num" onclick="add('2')">2</button>
        <button class="btn-num" onclick="add('3')">3</button>
        <button class="btn-op" onclick="add('+')">+</button>
        
        <button class="btn-num" onclick="add('0')">0</button>
        <button class="btn-num" onclick="add('.')">.</button>
        <button class="btn-eq" onclick="solve()">=</button>
        <button class="btn-op" onclick="add('-')">−</button>
        <button class="btn-back" style="grid-column: span 4;" onclick="resetAll()">AC / RESET</button>
    `;
}

function renderMenu() 
{
    modeText.innerText = "MENU";
    keypad.innerHTML = `
        <button class="btn-sci" onclick="renderTrig()">TRIG/LOG</button>
        <button class="btn-sci" onclick="renderMatrix()">MATRIX</button>
        <button class="btn-sci" onclick="renderEq()">EQN</button>
        <button class="btn-sci" onclick="renderConst()">CONST</button>
        <button class="btn-num" style="grid-column: span 2" onclick="renderStats()">STATS</button>
        <button class="btn-num" style="grid-column: span 2" onclick="renderBase()">BASE-N</button>
        <button class="btn-back" style="grid-column: span 4" onclick="renderStandard()">BACK</button>
    `;
}

function renderTrig() 
{
    modeText.innerText = "SCIENTIFIC";
    keypad.innerHTML = `
        <button class="btn-sci" onclick="add('sin(')">sin</button>
        <button class="btn-sci" onclick="add('cos(')">cos</button>
        <button class="btn-sci" onclick="add('tan(')">tan</button>
        <button class="btn-sci" onclick="add('log(')">log</button>
        <button class="btn-sci" onclick="add('ln(')">ln</button>
        <button class="btn-sci" onclick="add('√(')">√</button>
        <button class="btn-sci" onclick="add('(')">(</button>
        <button class="btn-sci" onclick="add(')')">)</button>
        <button class="btn-back" style="grid-column: span 4" onclick="renderMenu()">BACK</button>
    `;
}

function eng() 
{
    let v = parseFloat(disp.value);
    if (!isNaN(v)) disp.value = v.toExponential(2);
}

function del()
{ 
    disp.value = disp.value.slice(0, -1) || "0";

}
function resetAll()
{ 
    disp.value = "0"; 
    err.innerText = ""; 
    renderStandard(); 
}

function renderConst()
{
    modeText.innerText = "CONST";
    keypad.innerHTML = `
        <button class="btn-sci" onclick="add('299792458')">c</button>
        <button class="btn-sci" onclick="add('6.626e-34')">h</button>
        <button class="btn-sci" onclick="add('9.806')">g</button>
        <button class="btn-sci" onclick="add('1.602e-19')">e-</button>
        <button class="btn-back" style="grid-column: span 4" onclick="renderMenu()">BACK</button>
    `;
}

function renderMatrix()
{
    modeText.innerText = "MAT";
    keypad.innerHTML = `
        <input type="number" id="m11" class="nested-input" placeholder="a11">
        <input type="number" id="m12" class="nested-input" placeholder="a12">
        <input type="number" id="m21" class="nested-input" placeholder="a21">
        <input type="number" id="m22" class="nested-input" placeholder="a22">
        <button class="btn-eq" style="grid-column: span 4" onclick="calcDet()">DETERMINANT</button>
        <button class="btn-back" style="grid-column: span 4" onclick="renderMenu()">BACK</button>
    `;
}

function calcDet()
{
    let a=parseFloat(document.getElementById('m11').value)||0;
    let b=parseFloat(document.getElementById('m12').value)||0;
    let c=parseFloat(document.getElementById('m21').value)||0;
    let d=parseFloat(document.getElementById('m22').value)||0;
    disp.value = (a*d)-(b*c);
    renderStandard();
}

function renderEq()
{
    modeText.innerText = "EQN";
    keypad.innerHTML = `
        <input type="number" id="qa" class="nested-input" placeholder="a">
        <input type="number" id="qb" class="nested-input" placeholder="b">
        <input type="number" id="qc" class="nested-input" placeholder="c">
        <button class="btn-eq" style="grid-column: span 4" onclick="solveQuad()">FIND ROOTS</button>
        <button class="btn-back" style="grid-column: span 4" onclick="renderMenu()">BACK</button>
    `;
}

function solveQuad()
{
    let a=parseFloat(document.getElementById('qa').value)||0;
    let b=parseFloat(document.getElementById('qb').value)||0;
    let c=parseFloat(document.getElementById('qc').value)||0;
    let d = (b*b)-(4*a*c);

    if(d<0)
        err.innerText = "IMAGINARY";

    else 
        disp.value = "x1:"+((-b+Math.sqrt(d))/(2*a)).toFixed(2);
    renderStandard();
}

function renderStats()
{
    modeText.innerText = "STAT";
    keypad.innerHTML = `
        <input type="text" id="st-in" class="nested-input" placeholder="10,20,30">
        <button class="btn-num" style="grid-column: span 2" onclick="calcStat('mean')">MEAN</button>
        <button class="btn-num" style="grid-column: span 2" onclick="calcStat('var')">VAR</button>
        <button class="btn-back" style="grid-column: span 4" onclick="renderMenu()">BACK</button>
    `;
}

function calcStat(type)
{
    let val = document.getElementById('st-in').value.split(',').map(Number);
    let mean = val.reduce((a,b)=>a+b,0)/val.length;
    disp.value = type === 'mean' ? mean.toFixed(2) : (val.map(x=>Math.pow(x-mean,2)).reduce((a,b)=>a+b)/val.length).toFixed(2);
    renderStandard();
}

function renderBase()
{
    modeText.innerText = "BASE";
    keypad.innerHTML = `
        <input type="number" id="bs-in" class="nested-input" placeholder="Dec Value">
        <button class="btn-num" style="grid-column: span 2" onclick="calcBase(2)">BIN</button>
        <button class="btn-num" style="grid-column: span 2" onclick="calcBase(16)">HEX</button>
        <button class="btn-back" style="grid-column: span 4" onclick="renderMenu()">BACK</button>
    `;
}

function calcBase(b)
{
    let v = parseInt(document.getElementById('bs-in').value);
    disp.value = v.toString(b).toUpperCase();
    renderStandard();
}
