$(document).ready(function(){
    var phrases = [
        '便所はどこですか',
        'わからない',
        '久しぶり',
        '好きです',
        '明細書を見せて頂けますか',
        '私は菜食主義者です',
        '2003',
        '2001',
        'arizonaicedout',
        'emotions',
        'gatorade'
    ]

    function spaces(s, del){
        var o = '';
        var del = del || ' ';
        for (var i = 0; i < s.length; i++){
            o += s.charAt(i) + del;
        }
        return o;
    }

    function fullwidth(s){
        var o = '';
        for (var i = 0; i < s.length; i++){
            var c = s.charCodeAt(i);
            if (c >= 0x20 && c <= 0xef){
                o += String.fromCharCode(c + 0xfee0);
            }
        }
        return o;
    }

    var $inp = $('#sadinp'),
        $out = $('#sadout');

    $('#sadform').submit(function(e){
        e.preventDefault();
        var v = $inp.val();
        if (Math.random() > 0.2){
            v += phrases[Math.floor(Math.random() * phrases.length)];
            v = spaces(v);
        } else if (Math.random() > 0.5){
            v = spaces(v) + '\n' + spaces(v.slice(1), '\n');
        } else {
            v = fullwidth(v);
        }

        if (Math.random() > 0.5){
            v = v.toLowerCase();
        } else {
            v = v.toUpperCase();
        }
        $out.text(v);

        if (Math.random() > 0.5){
            $out.css('font-style', 'italic');
        } else {
            $out.css('font-style', 'normal');
        }
    })
})
