function VersionNumColor(versionNum, oldVersionNum) {
    if (versionNum == undefined || oldVersionNum == undefined || versionNum == '' || oldVersionNum == '' || versionNum.length != oldVersionNum.length) {
        return versionNum;
    }
    var news = versionNum.split('.');
    var olds = oldVersionNum.split('.');
    if (news.length == olds.length) {
        versionNum = '';
        var flag = true;
        for (var i = 0; i < news.length; i++) {
            if (flag) {
                if (news[i] == olds[i]) {
                    versionNum += news[i] + ".";
                }
                else if (news[i].length == olds[i].length) {
                    for (var j = 1; j <= news[i].length; j++) {
                        if (news[i].substr(0, j) == olds[i].substr(0, j)) {
                            continue;
                        }
                        else {
                            flag = false;
                            versionNum += news[i].substr(0, j - 1) + "<span style=\"color:red;\">" + news[i].substr(j - 1, news[i].length - j + 1) + "</span>.";
                            break;
                        }
                    }
                }
                else {
                    flag = false;
                    versionNum += "<span style=\"color:red;\">" + news[i] + "</span>.";
                }
            }
            else {
                versionNum += "<span style=\"color:red;\">" + news[i] + "</span>.";
            }
        }
        if (versionNum.indexOf(".") != -1) {
            versionNum = versionNum.substr(0, versionNum.length - 1);
        }
    }

    return versionNum;
}