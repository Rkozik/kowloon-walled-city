class Toolbar{
    constructor(gui) {
        this.gameboard =  document.getElementById("gameboard");
        this.toolbar = document.createElement('div');
        this.toolbar.id = "toolbar";
        this.gui = gui;
    }

    run(){
        this.draw();
        let toolbar_icons = document.getElementsByClassName("toolbar-ico");
        for(let i=0;i<toolbar_icons.length;i++){
            toolbar_icons[i].addEventListener('click', this.iconClick.bind(this), false);
        }
    }

    draw(){
        this.createToolbarIcon("residential-ico");
        this.createToolbarIcon("commercial-ico");
        this.createToolbarIcon("industrial-ico");
        this.createToolbarIcon("lobby-ico");
        this.createToolbarIcon("tenant-ico");
        this.gameboard.prepend(this.toolbar);
    }

    iconClick(event){
        switch(event.target.id){
            case "residential-ico":
                this.gui.updatePointer("residential");
                break;
            case "commercial-ico":
                this.gui.updatePointer("commercial");
                break;
            case "industrial-ico":
                this.gui.updatePointer("industrial");
                break;
            case "lobby-ico":
                this.gui.updatePointer("lobby");
                break;
            case "tenant-ico":
                this.gui.updatePointer("tenant");
                break;
            default:
                this.gui.updatePointer("pointer");
                break;
        }
    }

    createToolbarIcon(id_name){
        let icon = document.createElement('div');
        icon.className = "toolbar-ico";
        icon.id = id_name;

        this.toolbar.append(icon);
    }
}