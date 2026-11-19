/* INFINITY LIVE (Umar, 19 Nov 2026): "it can't be static pages ... a very
   living website, with lots of videos and a lot of animations. Pragma is a
   very live system ... I call it a forward demo."

   Every founder site carries this one file. Each [data-live] element becomes a
   self running demo of one platform, spoken in the founder's own sector
   vocabulary (window.LIVE, written by infinity_site.py from their answers):

     feed      the operation, live: events landing, agents acting, people approving
     graph     the ontology as a living graph: data pulses along typed links; click an object
     kinetics  a lifecycle the visitor can drive; a move the rules forbid is refused
     desk      the Pragma desktop: scheduled agents, a run streaming its tool calls,
               the judge's grade, the lesson kept for the next run
     design    watch it work: a requirement in, questions, reasons, the architecture
               building, the simulation running, the documents out
     bench     compress eight learnings into one principle, reinflate it somewhere new

   Illustrative and labelled so on the page: no record here is a customer's.
   Plain DOM and canvas, no library, no network. Honors reduced motion. */
(function () {
  'use strict';
  var D = window.LIVE || {};
  var O = D.objects || ['asset', 'sensor', 'site', 'work order', 'alert'];
  var N = D.names || {};
  var A = D.asset || O[0], WK = D.work || 'work order', AL = D.alert || 'alert';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
  var art = function (w) { return (/^[aeiou]/i.test(String(w)) ? 'an ' : 'a ') + w; };
  var cap = function (s) { return String(s).charAt(0).toUpperCase() + String(s).slice(1); };
  var pick = function (a, i) { return a[((i % a.length) + a.length) % a.length]; };
  var seed = 7; var rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  var clock = function (offsetMin) {
    var d = new Date(Date.now() + (offsetMin || 0) * 60000);
    return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
  };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, reduce ? 0 : ms); }); };
  function visible(node, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); fn(); } }); }, { rootMargin: '120px' });
    io.observe(node);
  }

  /* ---------- reveal: visible at rest, a small rise when scrolled into view */
  document.documentElement.classList.add('js');
  if (!reduce && 'IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } }); }, { threshold: 0.08 });
    document.querySelectorAll('.rv').forEach(function (n) {
      var r = n.getBoundingClientRect();
      if (r.top < window.innerHeight) n.classList.add('in'); else { n.classList.add('pre'); rio.observe(n); }
    });
  }

  /* ---------- feed: the operation, live */
  function events() {
    var p = D.people || 'the operations team';
    return [
      { k: 'sense', t: cap(A) + ' ' + (3 + Math.floor(rnd() * 9)) + ' · reading crossed its limit' },
      { k: 'agent', t: (N.pragma || 'Agent') + ' · drafted ' + WK + ' ' + (1000 + Math.floor(rnd() * 900)) + ', cited 3 records' },
      { k: 'human', t: 'Approved by ' + p.split(' and ')[0].replace(/s$/, '') },
      { k: 'sense', t: cap(O[1]) + ' ' + String.fromCharCode(65 + Math.floor(rnd() * 6)) + ' · trend rising for 40 minutes' },
      { k: 'agent', t: (N.pragma || 'Agent') + ' · skipped a duplicate: ' + WK + ' already open' },
      { k: 'learn', t: (N.engram || 'Memory') + ' · lesson kept: name who acts on every warning' },
      { k: 'sense', t: cap(O[2]) + ' ' + (1 + Math.floor(rnd() * 4)) + ' · ' + AL + ' raised' },
      { k: 'agent', t: (N.ontology || 'Ontology') + ' · ' + AL + ' linked to ' + A + ' and ' + WK },
      { k: 'human', t: 'Decision routed to a named approver, not delegated' }
    ];
  }
  function feed(root) {
    var list = el('ol', 'feed-list'); root.appendChild(list);
    var ev = events(), i = 0;
    function push() {
      var e = ev[i % ev.length]; i++;
      var li = el('li', 'k-' + e.k);
      li.appendChild(el('span', 'ft', clock()));
      li.appendChild(el('span', 'fk', e.k === 'sense' ? 'SENSE' : e.k === 'agent' ? 'AGENT' : e.k === 'human' ? 'PERSON' : 'LEARN'));
      li.appendChild(el('span', 'fx', e.t));
      list.insertBefore(li, list.firstChild);
      while (list.children.length > 6) list.removeChild(list.lastChild);
      if (i % ev.length === 0) ev = events();
    }
    for (var n = 0; n < 4; n++) push();
    if (!reduce) setInterval(push, 2600);
  }

  /* ---------- graph: the ontology, living */
  function graph(root) {
    var cv = el('canvas', 'graph-cv'); var info = el('div', 'graph-info');
    root.appendChild(cv); root.appendChild(info);
    var names = O.concat(['person', 'approval']).slice(0, 7);
    var links = [[0, 1], [0, 3], [1, 4], [4, 3], [3, 5], [5, 6], [2, 0], [2, 4], [4, 5], [1, 2]];
    var verbs = ['feeds', 'raises', 'triggers', 'opens', 'assigned to', 'approves', 'hosts', 'located at', 'routed to', 'serves'];
    var nodes = names.map(function (n, i) { var a = i / names.length * Math.PI * 2; return { n: n, x: Math.cos(a), y: Math.sin(a), vx: 0, vy: 0 }; });
    var sel = 3, pulses = [], W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1);
    function size() { var r = cv.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; }
    var ext = [1, 1];
    function fit() { var mx = 0.3, my = 0.3; nodes.forEach(function (n) { mx = Math.max(mx, Math.abs(n.x)); my = Math.max(my, Math.abs(n.y)); }); ext = [mx, my]; }
    function px(nd) { return [W / 2 + nd.x / ext[0] * (W / 2 - 90), H / 2 + nd.y / ext[1] * (H / 2 - 34)]; }
    function describe(i) {
      var nd = names[i];
      var props = { 0: ['status', 'location', 'last reading', 'criticality'], 3: ['priority', 'status', 'assignee', 'cites'], 4: ['severity', 'raised at', 'source', 'state'] }[i] || ['name', 'status', 'owner', 'updated'];
      var linked = links.filter(function (l) { return l[0] === i || l[1] === i; }).map(function (l) { return names[l[0] === i ? l[1] : l[0]]; });
      info.innerHTML = '';
      info.appendChild(el('div', 'gi-k', 'Object'));
      info.appendChild(el('div', 'gi-n', cap(nd)));
      info.appendChild(el('div', 'gi-k', 'Properties'));
      info.appendChild(el('div', 'gi-v', props.join(' · ')));
      info.appendChild(el('div', 'gi-k', 'Linked to'));
      info.appendChild(el('div', 'gi-v', linked.map(cap).join(' · ')));
      info.appendChild(el('div', 'gi-k', 'Agents may'));
      info.appendChild(el('div', 'gi-v', i === 3 ? 'create, assign, propose completion' : i === 6 ? 'request, never grant' : 'read, link, raise'));
    }
    cv.addEventListener('click', function (ev) {
      var r = cv.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top, best = -1, bd = 1e9;
      nodes.forEach(function (nd, i) { var p = px(nd), d = (p[0] - mx) * (p[0] - mx) + (p[1] - my) * (p[1] - my); if (d < bd) { bd = d; best = i; } });
      if (bd < 2500) { sel = best; describe(sel); }
    });
    function step() {
      for (var i = 0; i < nodes.length; i++) for (var j = i + 1; j < nodes.length; j++) {
        var a = nodes[i], b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy + 0.01, f = 0.0016 / d2;
        a.vx += dx * f; a.vy += dy * f; b.vx -= dx * f; b.vy -= dy * f;
      }
      links.forEach(function (l) { var a = nodes[l[0]], b = nodes[l[1]], dx = b.x - a.x, dy = b.y - a.y, f = (Math.sqrt(dx * dx + dy * dy) - 0.75) * 0.01; a.vx += dx * f; a.vy += dy * f; b.vx -= dx * f; b.vy -= dy * f; });
      nodes.forEach(function (nd) { nd.vx -= nd.x * 0.003; nd.vy -= nd.y * 0.003; nd.x += nd.vx; nd.y += nd.vy; nd.vx *= 0.86; nd.vy *= 0.86; });
      if (rnd() < 0.06) { var l = pick(links, Math.floor(rnd() * links.length)); pulses.push({ l: l, t: 0 }); }
      pulses.forEach(function (p) { p.t += 0.018; }); pulses = pulses.filter(function (p) { return p.t < 1; });
    }
    function draw() {
      fit(); var c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H);
      var ink = getComputedStyle(root).color, acc = D.accent || '#2D72D2';
      c.font = '11px ' + (D.mono || 'monospace');
      links.forEach(function (l, k) {
        var a = px(nodes[l[0]]), b = px(nodes[l[1]]);
        c.strokeStyle = ink; c.globalAlpha = (l[0] === sel || l[1] === sel) ? 0.55 : 0.18; c.lineWidth = 1;
        c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
        if (l[0] === sel || l[1] === sel) { c.globalAlpha = 0.6; c.fillStyle = ink; c.fillText(verbs[k], (a[0] + b[0]) / 2 + 4, (a[1] + b[1]) / 2 - 4); }
      });
      c.globalAlpha = 1;
      pulses.forEach(function (p) { var a = px(nodes[p.l[0]]), b = px(nodes[p.l[1]]); c.fillStyle = acc; c.beginPath(); c.arc(a[0] + (b[0] - a[0]) * p.t, a[1] + (b[1] - a[1]) * p.t, 3, 0, 7); c.fill(); });
      nodes.forEach(function (nd, i) {
        var p = px(nd), s = i === sel;
        c.fillStyle = s ? acc : getComputedStyle(root).backgroundColor || '#fff'; c.strokeStyle = s ? acc : ink; c.lineWidth = s ? 2 : 1.2;
        c.beginPath(); c.arc(p[0], p[1], s ? 9 : 7, 0, 7); c.fill(); c.stroke();
        c.fillStyle = ink; c.globalAlpha = s ? 1 : 0.8; c.font = (s ? '600 ' : '') + '13px ' + (D.body || 'sans-serif');
        c.fillText(cap(nd.n), p[0] + 12, p[1] + 4); c.globalAlpha = 1;
      });
    }
    size(); window.addEventListener('resize', size); describe(sel);
    for (var w = 0; w < 200; w++) step();
    (function loop() { if (!reduce) step(); draw(); requestAnimationFrame(loop); })();
  }

  /* ---------- kinetics: a lifecycle the visitor can drive */
  function kinetics(root) {
    var obj = WK;
    var T = { 'Assign': ['unassigned', 'assigned'], 'Start work': ['assigned', 'in progress'], 'Wait for parts': ['in progress', 'waiting for parts'],
      'Resume': ['waiting for parts', 'in progress'], 'Complete': ['in progress', 'completed'], 'Cancel': ['unassigned', 'cancelled'] };
    var states = ['unassigned', 'assigned', 'in progress', 'waiting for parts', 'completed', 'cancelled'];
    var cur = 'unassigned', id = cap(obj).replace(/ /g, '') + '-' + (1100 + Math.floor(rnd() * 99));
    var sv = el('div', 'kin-states'), bar = el('div', 'kin-btns'), log = el('div', 'kin-log');
    var head = el('div', 'kin-head'); head.appendChild(el('b', null, cap(obj) + ' ' + id)); head.appendChild(el('span', null, ' lifecycle on status'));
    root.appendChild(head); root.appendChild(sv); root.appendChild(bar); root.appendChild(log);
    function paint() {
      sv.innerHTML = '';
      states.forEach(function (s) { var x = el('span', 'kin-s' + (s === cur ? ' on' : ''), s); sv.appendChild(x); });
    }
    function say(t, bad) { var l = el('div', bad ? 'bad' : 'ok', t); log.insertBefore(l, log.firstChild); while (log.children.length > 3) log.removeChild(log.lastChild); }
    Object.keys(T).forEach(function (k) {
      var b = el('button', 'kin-b', k); b.type = 'button';
      b.onclick = function () {
        if (cur === T[k][0]) { cur = T[k][1]; say('✓ ' + k + ': now ' + cur + '. Same rule for a person and an agent.'); }
        else say('✕ Refused: ' + k.toLowerCase() + ' is only allowed while the ' + obj + ' is ' + T[k][0] + '. It is ' + cur + '.', true);
        paint();
      };
      bar.appendChild(b);
    });
    var r = el('button', 'kin-b ghost', 'Reset'); r.type = 'button'; r.onclick = function () { cur = 'unassigned'; paint(); say(id + ' reset to unassigned.'); }; bar.appendChild(r);
    paint(); say('Try a move that breaks the rule: the platform refuses it, the same way it refuses an agent.');
  }

  /* ---------- desk: the Pragma desktop, a run streaming */
  function desk(root) {
    var people = D.people || 'the operations team';
    var agents = [['Sentinel', 'ingest new ' + AL + 's every 30 minutes, dedupe'], ['Triage', 'score high ' + AL + 's and route them'],
      ['Evidence', 'attach the records behind every escalation'], ['Maintainer', 'turn faults on every ' + A + ' into ' + WK + 's'],
      ['Guardian', 'watch response times, propose reassignment'], ['Auditor', 'weekly check of every governed action']];
    var side = el('div', 'desk-side'), main = el('div', 'desk-main');
    var top = el('div', 'desk-top'); top.appendChild(el('span', 'dot r')); top.appendChild(el('span', 'dot y')); top.appendChild(el('span', 'dot g'));
    top.appendChild(el('span', 'desk-title', (N.pragma || 'Pragma') + ' · ' + (D.company || '')));
    top.appendChild(el('span', 'desk-mem', 'Self improving memory · on'));
    root.appendChild(top); var body = el('div', 'desk-body'); body.appendChild(side); body.appendChild(main); root.appendChild(body);
    side.appendChild(el('div', 'ds-k', 'Scheduled'));
    var rows = agents.map(function (a, i) { var r = el('div', 'ds-row'); r.appendChild(el('b', null, a[0])); r.appendChild(el('span', null, clock(-7 * i))); side.appendChild(r); return r; });
    var runs = [
      { a: 3, ask: 'Run the fault scan: open ' + art(WK) + ' for every new fault on ' + art(A) + ', cite the records, skip duplicates.',
        steps: ['Read 2 lessons from ' + (N.engram || 'memory'), 'read the ontology · ' + A, 'search the ontology · open ' + WK + 's', 'read an action\'s contract · create ' + WK,
          'create ' + WK + ' · High · cites 2 records', 'create ' + WK + ' · Medium · cites 3 records'],
        out: 'Faults found: 11 | ' + cap(WK) + 's created: 2 | Skipped as duplicate: 9', grade: 0.9,
        why: 'Every new fault cited its records, duplicates were checked against open ' + WK + 's, and the closing counts line was there.',
        lesson: 'Always end the scan with one line of counts, even when nothing new was created.' },
      { a: 1, ask: 'Score every high ' + AL + ' from the last hour and route it to ' + people + ' with a draft explanation.',
        steps: ['Read 3 lessons from ' + (N.engram || 'memory'), 'list ' + AL + 's · last hour', 'read the ontology · ' + A, 'score 4 ' + AL + 's', 'route 2 to a named approver', 'draft 2 explanations'],
        out: 'Scored: 4 | Routed: 2 | Left for the morning review: 2', grade: 0.6,
        why: 'Routing was right, but one explanation did not say which reading started the clock.',
        lesson: 'Name the reading that starts the clock in every explanation, not only the threshold.' }
    ];
    var feedEl = el('div', 'dm-feed'); main.appendChild(feedEl);
    async function play(k) {
      var r = runs[k % runs.length]; feedEl.innerHTML = '';
      rows.forEach(function (x, i) { x.classList.toggle('on', i === r.a); });
      var q = el('div', 'dm-ask'); q.appendChild(el('span', 'dm-who', agents[r.a][0])); q.appendChild(el('span', null, r.ask)); feedEl.appendChild(q);
      await wait(900);
      for (var i = 0; i < r.steps.length; i++) { var s = el('div', 'dm-step', r.steps[i]); feedEl.appendChild(s); await wait(650); s.classList.add('done'); }
      feedEl.appendChild(el('div', 'dm-out', r.out)); await wait(1100);
      var g = el('div', 'dm-grade'); g.appendChild(el('span', 'dm-k', 'Judge'));
      var meter = el('span', 'dm-meter'); var fill = el('i'); meter.appendChild(fill); g.appendChild(meter);
      g.appendChild(el('b', null, (r.grade > 0 ? '+' : '') + r.grade.toFixed(2)));
      feedEl.appendChild(g); feedEl.appendChild(el('div', 'dm-why', r.why));
      setTimeout(function () { fill.style.width = ((r.grade + 1) / 2 * 100) + '%'; }, 60);
      await wait(1400);
      var l = el('div', 'dm-lesson'); l.appendChild(el('span', 'dm-k', 'Lesson kept')); l.appendChild(el('span', null, r.lesson)); feedEl.appendChild(l);
      await wait(5200); play(k + 1);
    }
    visible(root, function () { play(0); });
  }

  /* ---------- design: watch it work */
  function design(root) {
    var req = 'We need ' + (D.design || 'an AI system for our operation') + '. ' + (D.customer || '');
    var lanes = [['Sources', A + ' sensors · cameras · existing systems'], ['Adapters', 'read only, one per system of record'],
      ['Object model', O.slice(0, 4).join(' · ')], ['Inference', 'edge · site · central, open weight models'], ['Surfaces', 'control room · mobile · approvals']];
    var q = ['How many sites?', 'Which systems of record?', 'Who approves an action?', 'Connected or air gapped?', 'Which hardware is on site?', 'What does a miss cost?'];
    var reasons = ['Sensing at the ' + A + ', because the warning starts there', 'Models at the edge, because the link drops', 'A named approver for every ' + WK + ', because the decision is theirs'];
    var docs = ['Proposal.pdf', 'Functional specification.docx', 'Architecture.svg', 'Object model.json', 'Simulation'];
    var box = el('div', 'dw'); root.appendChild(box);
    async function run() {
      box.innerHTML = '';
      var rq = el('div', 'dw-req'); rq.appendChild(el('span', 'dw-k', 'Requirement')); var t = el('span', 'dw-type'); rq.appendChild(t); box.appendChild(rq);
      for (var i = 0; i <= req.length; i += 3) { t.textContent = req.slice(0, i); await wait(18); }
      var qs = el('div', 'dw-qs'); box.appendChild(qs);
      for (var j = 0; j < q.length; j++) { qs.appendChild(el('span', 'dw-q', q[j])); await wait(220); }
      var rs = el('div', 'dw-rs'); rs.appendChild(el('span', 'dw-k', 'The plan, with its reasons')); box.appendChild(rs);
      for (var k = 0; k < reasons.length; k++) { rs.appendChild(el('div', 'dw-r', reasons[k])); await wait(500); }
      var st = el('div', 'dw-stack'); box.appendChild(st);
      for (var m = lanes.length - 1; m >= 0; m--) { var ln = el('div', 'dw-lane'); ln.appendChild(el('b', null, lanes[m][0])); ln.appendChild(el('span', null, lanes[m][1])); st.insertBefore(ln, st.firstChild); await wait(380); }
      var ds = el('div', 'dw-docs'); box.appendChild(ds);
      for (var n = 0; n < docs.length; n++) { ds.appendChild(el('span', 'dw-doc', docs[n])); await wait(260); }
      await wait(6000); run();
    }
    visible(root, run);
  }

  /* ---------- bench: compress and reinflate */
  function bench(root) {
    var p = D.people || 'the team';
    var L = [['Benchmark miss', 'A design sensed the ' + AL + ' and never said who acts on it.'],
      ['Engineer correction', 'The alert went to a desk that cannot act on the ' + A + '. Route it to ' + p.split(' and ')[0] + '.'],
      ['Real requirement', 'A tender asks for alerts to reach "the responsible officer" in a minute. Responsible for what?'],
      ['Field learning', 'Operators ignore an alert that arrives without a decision attached.'],
      ['Benchmark miss', 'A reading crossed its limit; the design logged it and paged no one.'],
      ['Engineer correction', 'Name the reading that starts the clock, not only the threshold.'],
      ['Earlier note', 'Send every alert to the shift manager.'], ['Earlier note', 'Make critical alerts red.']];
    var principle = 'Every sensed warning names the role that acts, the reading that starts the clock, and the options of the decision.';
    var places = D.places || ['A site in Texas', 'A site in Arizona', 'A site in Georgia'];
    var cards = el('div', 'bn-cards'), out = el('div', 'bn-out'), btns = el('div', 'bn-btns');
    root.appendChild(cards); root.appendChild(btns); root.appendChild(out);
    var cs = L.map(function (l) { var c = el('div', 'bn-card'); c.appendChild(el('span', 'bn-k', l[0])); c.appendChild(el('span', null, l[1])); cards.appendChild(c); return c; });
    var go = el('button', 'kin-b', 'Compress'); go.type = 'button'; btns.appendChild(go);
    var pb = places.map(function (pl) { var b = el('button', 'kin-b ghost', pl); b.type = 'button'; b.disabled = true; btns.appendChild(b); return b; });
    out.appendChild(el('div', 'bn-hint', 'Press Compress: six learnings become one principle, one contradiction is resolved, one note fades.'));
    go.onclick = async function () {
      go.disabled = true;
      for (var i = 0; i < cs.length; i++) { cs[i].classList.add(i >= 6 ? 'fade' : 'merge'); await wait(140); }
      out.innerHTML = ''; var pc = el('div', 'bn-pr'); pc.appendChild(el('span', 'bn-k', 'Principle · v6 · cites 6 learnings')); pc.appendChild(el('b', null, principle)); out.appendChild(pc);
      pb.forEach(function (b) { b.disabled = false; });
      out.appendChild(el('div', 'bn-hint', 'Now pick a place: the same principle becomes a different design in each one.'));
    };
    pb.forEach(function (b, i) {
      b.onclick = function () {
        var o = out.querySelector('.bn-re') || el('div', 'bn-re'); out.appendChild(o);
        o.innerHTML = ''; o.appendChild(el('span', 'bn-k', 'Reinflated · ' + places[i]));
        o.appendChild(el('span', null, 'At ' + places[i].replace(/^A /, 'a ') + ', ' + art(AL) + ' on ' + art(A) + ' pages ' + p.split(' and ')[i % 2] +
          ' within a minute, names the reading that started the clock, and offers: dispatch a crew, hold, or escalate.'));
      };
    });
  }

  var MAP = { feed: feed, graph: graph, kinetics: kinetics, desk: desk, design: design, bench: bench };
  document.querySelectorAll('[data-live]').forEach(function (n) { var f = MAP[n.getAttribute('data-live')]; if (f) try { f(n); } catch (e) { n.textContent = ''; } });

  /* the camera timecode on every hero */
  var tcs = document.querySelectorAll('[data-tc]');
  if (tcs.length) { var tick = function () { tcs.forEach(function (t) { t.textContent = clock(); }); }; tick(); setInterval(tick, 1000); }

  /* hero video: play when it can, poster stays when it cannot */
  document.querySelectorAll('video[data-bg]').forEach(function (v) {
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); return; }
    var p = v.play(); if (p && p.catch) p.catch(function () {});
  });
})();
