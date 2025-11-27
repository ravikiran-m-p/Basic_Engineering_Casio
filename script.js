window.onload = function()
{
let main_display = document.getElementById('main_display');
function append_num(n)
{
      if(n.toLowerCase()=='π')
      n = Math.PI;
      
        
      if(n.toLowerCase()=='e')
      n = Math.E;
        
      if(main_display.value=="" || main_display.value=="0")
      main_display.value = n;
      
        
      else
      main_display.value += n;
  
}

function append_op(op)
{
    main_display.value += op;
}

function clear_display()
{
    main_display.value = "";
}

function delete_last()
    main_display.value = main_display.value.slice(0,-1);

function calc_result()
{
      try
      {
      main_display.value = eval(main_display.value);
      }
      catch
      {
      main_display.value = "Error";
      }
}

function factorial(n)
{
      if(n<0)
      {
      return "Error";
      }
      if(n==0 || n==1)
      {
      return 1;
      }
      let f = 1;
      for(let i=2;i<=n;i++)
      {
      f *= i;
      }
      return f;
}

function ten_power()
{
      let val = parseFloat(main_display.value);
      if(isNaN(val))
      {
      main_display.value = "Error";
      return;
      }
      main_display.value = Math.pow(10,val);
}

function apply_func(func)
{
      try
      {
      let val = parseFloat(main_display.value);
      let res;
      
      switch(func)
      {
      case "sqrt":
      res = Math.sqrt(val);
      break;
      case "sin":
      res = Math.sin(val*Math.PI/180);
      break;
      case "cos":
      res = Math.cos(val*Math.PI/180);
      break;
      case "tan":
      res = Math.tan(val*Math.PI/180);
      break;
      case "log":
      res = Math.log10(val);
      break;
      case "ln":
      res = Math.log(val);
      break;
      case "factorial":
      res = factorial(val);
      break;
      case "n_pr":
      let npr_vals = prompt("enter n,r comma separated","5,2");
      if(npr_vals)
      {
      let arr = npr_vals.split(',');
      let n = parseInt(arr[0]);
      let r = parseInt(arr[1]);
      res = factorial(n)/factorial(n-r);
      }
      else
      {
      return;
      }
      break;
      case "n_cr":
      let ncr_vals = prompt("enter n,r comma separated","5,2");
      if(ncr_vals)
      {
      let arr = ncr_vals.split(',');
      let n = parseInt(arr[0]);
      let r = parseInt(arr[1]);
      res = factorial(n)/(factorial(r)*factorial(n-r));
      }
      else
      {
      return;
      }
      break;
      }
      main_display.value = res;
      }
      catch
      {
      main_display.value = "Error";
      }
}

function hide_all_panels()
{
    document.getElementById('stats_panel').style.display = 'none';
    document.getElementById('temp_panel').style.display = 'none';
    document.getElementById('base_panel').style.display = 'none';
    document.getElementById('conv_panel').style.display = 'none';
}

function show_stats_panel()
{
    hide_all_panels();
    let p = document.getElementById('stats_panel');
    p.style.display = 'block';
    p.innerHTML = `<p>numbers comma sep</p>
    <input id="stats_input" placeholder="1,2,3">
    <select id="stats_select">
    <option value="sum">sum</option>
    <option value="mean">mean</option>
    <option value="median">median</option>
    <option value="mode">mode</option>
    <option value="variance">variance</option>
    <option value="std">std_dev</option>
    </select>
    <button onclick="compute_stats()">compute</button>`;
}

function compute_stats()
{
      let nums = document.getElementById('stats_input').value.split(',').map(Number);
      let op = document.getElementById('stats_select').value;
      nums.sort(function(a,b){ return a-b; });
      let res;
      
      switch(op) {
    case "sum":
        res = nums.reduce(function(a, b) {
            return a + b;
        }, 0);
        break;

    case "mean":
        res = nums.reduce(function(a, b) {
            return a + b;
        }, 0) / nums.length;
        break;

    case "median":
        let mid = Math.floor(nums.length / 2);
        if (nums.length % 2 != 0) {
            res = nums[mid];
        } else {
            res = (nums[mid - 1] + nums[mid]) / 2;
        }
        break;

    case "mode":
        let freq = {};
        nums.forEach(function(n) {
            freq[n] = (freq[n] || 0) + 1;
        });
        let maxf = Math.max.apply(null, Object.values(freq));
        res = Object.keys(freq).filter(function(k) {
            return freq[k] == maxf;
        }).join(',');
        break;

    case "variance":
        let mean = nums.reduce(function(a, b) {
            return a + b;
        }, 0) / nums.length;
        res = nums.reduce(function(a, b) {
            return a + Math.pow(b - mean, 2);
        }, 0) / nums.length;
        break;

    case "std":
        let mean2 = nums.reduce(function(a, b) {
            return a + b;
        }, 0) / nums.length;
        res = Math.sqrt(
            nums.reduce(function(a, b) {
                return a + Math.pow(b - mean2, 2);
            }, 0) / nums.length
        );
        break;
}
main_display.value = res;
}

function show_temp_panel()
{
      hide_all_panels();
      let p = document.getElementById('temp_panel');
      p.style.display = 'block';
      p.innerHTML = `<input id="temp_input" type="number" placeholder="val">
      <select id="from_unit"><option>C</option><option>F</option><option>K</option></select>
      <select id="to_unit"><option>C</option><option>F</option><option>K</option></select>
      <button onclick="convert_temp()">convert</button>`;
}

function convert_temp()
{
        let val = parseFloat(document.getElementById('temp_input').value);
        let f = document.getElementById('from_unit').value.toUpperCase();
        let t = document.getElementById('to_unit').value.toUpperCase();
        let res;
        
        if(f=="C" && t=="F") res = (val*9/5)+32;
        else if(f=="F" && t=="C") res = (val-32)*5/9;
        else if(f=="C" && t=="K") res = val+273.15;
        else if(f=="K" && t=="C") res = val-273.15;
        else if(f=="F" && t=="K") res = (val-32)*5/9+273.15;
        else if(f=="K" && t=="F") res = (val-273.15)*9/5+32;
        else { main_display.value = "Error"; return; }
        
        main_display.value = res;
}

function show_base_panel()
{
    hide_all_panels();
    let p = document.getElementById('base_panel');
    p.style.display = 'block';
    p.innerHTML = `<input id="base_input" placeholder="num">
    <select id="base_select">
    <option value="2">bin</option>
    <option value="8">oct</option>
    <option value="10">dec</option>
    <option value="16">hex</option>
    </select>
    <button onclick="convert_base()">convert</button>`;
}

function convert_base()
{
      let val = document.getElementById('base_input').value.trim();
      let b = parseInt(document.getElementById('base_select').value);
      let n = parseInt(val,10);
      if(isNaN(n)) { main_display.value = "Error"; return; }
      let res = n.toString(b).toUpperCase();
      if(res.length>16) res = res.slice(0,16)+"…";
      main_display.value = res;
}

function show_conv_panel()
{
      hide_all_panels();
      let p = document.getElementById('conv_panel');
      p.style.display = 'block';
      p.innerHTML = `<p>engineering conv</p>
      <input id="conv_input" type="number" placeholder="val">
      <select id="conv_type">
      <option value="deg2rad">deg->rad</option>
      <option value="rad2deg">rad->deg</option>
      <option value="m2cm">m->cm</option>
      <option value="cm2m">cm->m</option>
      <option value="kg2g">kg->g</option>
      <option value="g2kg">g->kg</option>
      <option value="l2ml">L->mL</option>
      <option value="ml2l">mL->L</option>
      </select>
      <button onclick="convert_eng()">convert</button>`;
}

function convert_eng()
{
        let val = parseFloat(document.getElementById('conv_input').value);
        let t = document.getElementById('conv_type').value;
        let res;
        
        switch(t)
        {
        case "deg2rad": res = val*Math.PI/180; break;
        case "rad2deg": res = val*180/Math.PI; break;
        case "m2cm": res = val*100; break;
        case "cm2m": res = val/100; break;
        case "kg2g": res = val*1000; break;
        case "g2kg": res = val/1000; break;
        case "l2ml": res = val*1000; break;
        case "ml2l": res = val/1000; break;
        }
        
        main_display.value = res;
        }
        
        window.append_num = append_num;
        window.append_op = append_op;
        window.clear_display = clear_display;
        window.delete_last = delete_last;
        window.calc_result = calc_result;
        window.ten_power = ten_power;
        window.apply_func = apply_func;
        window.show_stats_panel = show_stats_panel;
        window.compute_stats = compute_stats;
        window.show_temp_panel = show_temp_panel;
        window.convert_temp = convert_temp;
        window.show_base_panel = show_base_panel;
        window.convert_base = convert_base;
        window.show_conv_panel = show_conv_panel;
        window.convert_eng = convert_eng;

}
