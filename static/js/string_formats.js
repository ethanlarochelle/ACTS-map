function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function formatPhone(str)
{
    return str.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}