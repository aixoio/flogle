
function textfCaptcha(elemSEL, onSuccess, onSubmit = null, onChange = null, onError = null, caseSensitive = true, mess = "Enter the text you see", pos = "left") {

    if (mess == null) mess = "Enter the text you see"
    if (pos == null) pos = "left"

    function uuid(len) {

        const chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
        let res = "";

        for (let i = 0; i < len; i++) {

            let indexChar = Math.floor(Math.random() * chars.length);
            res += chars[indexChar];

        }

        return res;

    }

    const width = 500;
    const height = 150;

    function drawText(g2d) {

        g2d.clearRect(0, 0, width, height);
        

        function randomColor() {
            
            let options = "abcdef0123456789";

            let newStr = "#";

            for (let i = 0; i < 6; i++) {

                newStr += options[Math.round(Math.random() * (options.length - 1))]

            }

            return newStr;

        }

        g2d.fillStyle = randomColor()
        
        g2d.fillRect(0, 0, 500, 150)
        
        for (let i = 0; i < 175; i++) {
            
            g2d.fillStyle = randomColor()

            let pos = {

                x: Math.round(Math.random() * width),
                y: Math.round(Math.random() * height),
                width: Math.floor(Math.random() * (100 + 20)),
                height: Math.floor(Math.random() * (30 + 20))

            }

            g2d.fillRect(pos.x, pos.y, pos.width, pos.height)
            

        }

        let text = uuid(8);

        g2d.font = "25px 'Times New Roman', Times, serif"

        g2d.fillStyle = "#ffffff"

        let sx = 35;
        let sy = 75;

        for (let i = 0; i < text.length; i++) {

            if (Math.random() > 0.5) {

                 g2d.fillStyle = "#ffffff"

            } else {

                g2d.fillStyle = "#000000"

            }

            g2d.fillText(text[i], sx, sy);

            sx += 50
            sy -= 3

        }

        return text;


    }
    
    let elem = $(elemSEL)

    for (let i = 0; i < elem.length; i++) {

        let curr = $(elem[i]);

        if (pos == "left") {

            curr.addClass("fCaptcha left")

        }

        if (pos == "right") {

            curr.addClass("fCaptcha right")

        }

        if (pos == "center") {

            curr.addClass("fCaptcha center")

        }

        if (pos == "justify") {

            curr.addClass("fCaptcha justify")

        }
        
        let canvas = $("<canvas></canvas>");
        let title = $("<h1></h1>");
        let input = $("<input></input>");
        let submitBtn = $("<button></button>");
        let remakeSpBt = $("<span></span>")
        
        
        title.text(mess)
        
        canvas[0].width = 500
        canvas[0].height = 150
        
        submitBtn.text("Verify")
        remakeSpBt.text("Regenerate")
        
        let txt = drawText(canvas[0].getContext("2d"));

        title.addClass("fCaptcha title")
        canvas.addClass("fCaptcha canvas")
        input.addClass("fCaptcha input")
        submitBtn.addClass("fCaptcha btn")
        remakeSpBt.addClass("fCaptcha span")

        remakeSpBt.on("click", function () {
            
            txt = drawText(canvas[0].getContext("2d"));

            if (onChange != null) onChange()

        })

        submitBtn.on("click", function () {
            
            let inTxt = input.val();
            
            if (onSubmit != null) onSubmit()

            let ttxt = txt;

            if (!caseSensitive) {

                ttxt = txt.toLowerCase();
                inTxt = inTxt.toLowerCase()

            }

            if (inTxt == ttxt) {

                onSuccess()

            } else {

                if (onError != null) onError()

                txt = drawText(canvas[0].getContext("2d"));

                if (onChange != null) onChange()

                input.val("")

            }

        })

        curr.append(title)
        curr.append($("<br>"))
        curr.append(canvas);
        curr.append($("<br>"))
        curr.append($("<br>"))
        curr.append(input)
        curr.append(submitBtn)
        curr.append(remakeSpBt)


    }

    

}

