export module helper{
    export const colors  = ['aqua', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'orange' ,'purple', 'red', 'silver', 'teal', 'yellow']
    export const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    export const menu ='<li data-target="${NAME}" class="list-group-item"><a data-target="${NAME}" onclick="return false" href="#">${NAME}</a></li>';
    export const content ="";

    export function getRandomColor(){
        return colors[Math.floor(Math.random() * colors.length)];
    }
}