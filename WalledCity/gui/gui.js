class GUI{
    constructor(tower, bank_account) {
        this.clock = new Clock();
        this.bank_account = bank_account;
        this.toolbar = new Toolbar(this, this.clock, this.bank_account);
        this.tower = tower;
        this.gameboard = document.getElementById("gameboard");
        this.pointer = "pointer";
        this.dragging = false;
        this.nodes_hovered = new Map();
    }

    run(){
        this.toolbar.run();
        let nodes = document.getElementsByClassName("node");
        for(let i=0;i<nodes.length;i++){
            nodes[i].addEventListener('click', this.nodeClick.bind(this), false);
            nodes[i].addEventListener('mouseover', this.nodeHover.bind(this), false);
        }

        this.gameboard.addEventListener('mousedown', this.handleMouseDownGameboard.bind(this), false);
        this.gameboard.addEventListener('mouseup', this.handleMouseUpGameboard.bind(this), false);

        this.setGameHeight();
    }

    drawNode(node){
        switch(this.pointer){
            case "lobby":
                let lobby = new Lobby(node, this.tower, this.bank_account);
                lobby.draw();
                break;
            case "tenant":
                let unit = new Unit(node, this.tower, this.clock, this.bank_account);
                unit.draw();
                break;
            case "residential":
                let residential_residence = new ResidentialResidence(node, this.tower, this.bank_account);
                residential_residence.draw();
                break;
            case "commercial":
                let commercial_residence = new CommercialResidence(node, this.tower, this.bank_account);
                commercial_residence.draw();
                break;
            case "industrial":
                let industrial_residence = new IndustrialResidence(node, this.tower, this.bank_account);
                industrial_residence.draw();
                break;
            case "stairs":
                let stairs = new Stairs(node, this.tower, this.bank_account);
                stairs.draw();
                break;
            default:
                break;
        }
    }

    nodeClick(event){
        let node = this.getNodeFromEvent(event);
        this.drawNode(node);
    }

    nodeHover(event){
        let node = this.getNodeFromEvent(event);
        this.nodes_hovered.set(node, true);

        if(this.dragging === true){
            this.drawNode(node);
        }
    }

    updatePointer(pointer){
        let cursor_styles = document.createElement('style');

        switch(pointer){
            case "residential":
                cursor_styles.innerText = "body{cursor:url('img/gui/residential-ico.png'), pointer;}";
                break;
            case "commercial":
                cursor_styles.innerText = "body{cursor:url('img/gui/commercial-ico.png'), pointer;}";
                break;
            case "industrial":
                cursor_styles.innerText = "body{cursor:url('img/gui/industrial-ico.png'), pointer;}";
                break;
            case "lobby":
                cursor_styles.innerText = "body{cursor:url('img/gui/lobby-ico.png'), pointer;}";
                break;
            case "tenant":
                cursor_styles.innerText = "body{cursor:url('img/gui/tenant-ico.png'), pointer;}";
                break;
            case "stairs":
                cursor_styles.innerText = "body{cursor:url('img/gui/stairs-ico.png'), pointer;}";
                break;
            default:
                cursor_styles.innerText = "body{cursor:url('img/gui/pointer-ico.png'), pointer;}";
                break
        }

        this.pointer = pointer;
        document.head.append(cursor_styles);
    }

    handleMouseDownGameboard(event){
        this.nodes_hovered.clear();
        this.dragging = true;
    }

    handleMouseUpGameboard(event){
        this.dragging = false;
    }

    getNodeFromEvent(event){
        let position = parseInt(event.target.id.split('_')[2]);
        let floor = parseInt(event.target.id.split('_')[1]);
        return this.tower.getFloor(floor).getNode(position);
    }

    setGameHeight(){
        let gameboard = document.getElementById("gameboard");
        gameboard.setAttribute('style','height: ' + window.innerHeight + "px");
    }
}