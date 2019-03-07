const TYPE_BAOZI = 6; 	// 三条
const TYPE_TONGHUASHUN = 5; // 同花顺
const TYPE_TONGHUA = 4;  // 同花
const TYPE_SHUNZI = 3; // 顺子
const TYPE_DUIZI = 2;   // 对子
const TYPE_DANDIAO = 1; // 单张


/**
 * @param pokers 3张扑克牌数组
 * 
 * @return object {type:牌型,pokers:扑克有序列表,head:打头牌组,min:中间牌组,tail:打尾牌组
 * ,laizi:[]癞子牌在pokers的下标,hasBig有没有大王,hasSmall有没有小王}
 */
exports.getPokersType = function (pokers, laizi) {
    //laizi 0没有选 1当红黑 2当任意
    if (pokers.length != 3) {
        return;
    }
    //降序 黑红梅方
    pokers.sort(function (a, b) {
        if (a == 0x41 || a == 0x42 || b == 0x41 || b == 0x42) {
            //如果出现了大小王 就先比花色
            if ((a >> 4) == (b >> 4)) {
                return (b & 0x0F) - (a & 0x0F);
            }
            return (b >> 4) - (a >> 4);
        } else {
            if ((b & 0X0F) == (a & 0X0F)) {
                return (b >> 4) - (a >> 4);
            }
            return (b & 0X0F) - (a & 0X0F);
        }
    });
    console.log('bbbbbbbb', pokers);

    //类似于countMap
    var hash_value = [];
    for (let i = 0; i < 17; i++) {
        hash_value[i] = 0;//长度为15 下标 0-14 的数组 下标代表从 2-大王
    }
    //构造hash_value
    for (let i = 0; i < 3; i++) {
        if (pokers[i] == 0x41) {
            //小王
            hash_value[15]++;
        } else if (pokers[i] == 0x42) {
            //大王
            hash_value[16]++;
        } else {
            hash_value[value(pokers[i])]++;
        }
    }
    console.log('hash_value:', hash_value);

    //通过hash_value 可以先把 豹子对子和单张区分开，单张里面再判断顺子和同花
    var _bao = 0;
    var _dui = 0;
    var _dan = [];

    var hasXW = hash_value[15] == 1; //有没有小王
    var hasDW = hash_value[16] == 1; //有没有大王

    var type = [];//类型 数组 因为肯能是三条加同花这种

    hash_value.forEach((value, index, array) => {
        if (value == 3) {
            _bao = index;
        } else if (value == 2) {
            _dui = index;
        } else if (value == 1) {
            _dan.push(index);
        }
    })

    // 三条
    if (_bao > 0) {
        type.push(TYPE_BAOZI);
        return { type: type, pokers: pokers, laizi: [], head: _bao, hasBig: hasDW, hasSmall: hasXW };
    }

    // 对子
    if (_dui > 0) {
        //如果有大小王，那张单排就是王牌
        if (hasXW || hasDW) {
            type.push(TYPE_BAOZI);//三条
            let pkc = pokers.concat();//把王牌变成实际的牌
            if (laizi == 1) {
                //当红黑
                if (hasXW) {
                    //有小王当黑桃最大
                    pkc[0] = maxType(value(_dui), 'hei');
                } else {
                    //有大王就是红桃最大
                    pkc[0] = maxType(value(_dui));
                }
            } else if (laizi == 2) {
                //当任意就都选黑桃
                pkc[0] = maxType(value(_dui), 'hei');
            }
            //降序 黑红梅方
            pkc.sort(function (a, b) {
                if (a == 0x41 || a == 0x42 || b == 0x41 || b == 0x42) {
                    //如果出现了大小王 就先比花色
                    if ((a >> 4) == (b >> 4)) {
                        return (b & 0x0F) - (a & 0x0F);
                    }
                    return (b >> 4) - (a >> 4);
                } else {
                    if ((b & 0X0F) == (a & 0X0F)) {
                        return (b >> 4) - (a >> 4);
                    }
                    return (b & 0X0F) - (a & 0X0F);
                }
            });
            console.log('pkc:', pkc);
            return { type: type, pokers: pkc, laizi: [0], head: _dui, hasBig: hasDW, hasSmall: hasXW };
        } else {
            type.push(TYPE_DUIZI);//对子
            return { type: type, pokers: pokers, laizi: [], head: _dui, mid: _dan[0], hasBig: hasDW, hasSmall: hasXW };
        }
    }

    //下面的就是三个单张的了
    //降序排列 第一个最大 这里不能算大小王 大王算的是2 小王是1
    var max = pokers[0] & 0x0F;
    var mid = pokers[1] & 0x0F;
    var min = pokers[2] & 0x0F;

    var laiziPai = [];//癞子
    var head = -1;//头牌
    var middle = -1;//中牌
    var tail = -1;//尾牌

    let pkc = pokers.concat();
    //如果有大王和小王
    if (hasXW && hasDW) {
        console.log('有大王和小王');
        var dan = value(pokers[2]);
        //有一张大王 一张小王
        var color = typeColor(pokers[2]); //单排的花色
        if (laizi == 1) {
            //当红黑
            pkc[0] = maxType(dan, 'hong');
            pkc[1] = maxType(dan, 'hei');
            type.push(TYPE_BAOZI);//三条
        } else if (laizi == 2) {
            //当任意
            if (color == 0) {
                pkc[0] = maxType(dan, 'fang');
                pkc[1] = maxType(dan, 'fang');
            } else if (color == 1) {
                pkc[0] = maxType(dan, 'mei');
                pkc[1] = maxType(dan, 'mei');
            } else if (color == 2) {
                pkc[0] = maxType(dan, 'hong');
                pkc[1] = maxType(dan, 'hong');
            } else if (color == 3) {
                pkc[0] = maxType(dan, 'hei');
                pkc[1] = maxType(dan, 'hei');
            }
            type.push(TYPE_BAOZI);//三条
            type.push(TYPE_TONGHUA);//同花
        }
        //降序 黑红梅方 这里排不排都无所谓其实
        pkc.sort(function (a, b) {
            if (a == 0x41 || a == 0x42 || b == 0x41 || b == 0x42) {
                //如果出现了大小王 就先比花色
                if ((a >> 4) == (b >> 4)) {
                    return (b & 0x0F) - (a & 0x0F);
                }
                return (b >> 4) - (a >> 4);
            } else {
                if ((b & 0X0F) == (a & 0X0F)) {
                    return (b >> 4) - (a >> 4);
                }
                return (b & 0X0F) - (a & 0X0F);
            }
        });
        console.log('pkc2:', pkc);
        //传说中的三条同花,但是还是按三条的牌型来算
        return { type: type, pokers: pkc, laizi: [0, 1], head: dan, hasBig: hasDW, hasSmall: hasXW };
    } else if (hasDW || hasXW) {
        console.log('有大王或者小王');
        let tp1 = typeColor(pokers[1]);
        let tp2 = typeColor(pokers[2]);
        //两张单，一张王  顺子 同花 同花顺  对子
        if (laizi == 1) {
            //当红黑
            if (hasDW) {
                //大王 如果两张单排差值为1或2  或者一张是1一张是2或3
                if (mid - min == 1) {
                    let pai;
                    //特殊情况 王 A K
                    if (mid == 14 && min == 13) {
                        pai = 12; //Q

                        head = 14;
                        middle = 13;
                        tail = 12;
                        laiziPai.push(2); //癞子的下标
                    } else {
                        pai = mid + 1;

                        head = pai;
                        middle = mid;
                        tail = min;
                        laiziPai.push(0); //癞子的下标
                    }
                    //如果差1
                    if ((tp1 == tp2) && (tp1 == 2 || tp1 == 0)) {
                        //如果两张单牌花色相同 并且为红色的 因为这里是大王当红黑模式
                        if (tp1 == 2) {
                            //红桃
                            pkc[0] = maxType(pai, 'hong');
                        } else if (tp1 == 0) {
                            pkc[0] = maxType(pai, 'fang');
                        }
                        type.push(TYPE_TONGHUASHUN);

                    } else {
                        //花色不同 就随便去一个大点的花色
                        pkc[0] = maxType(pai, 'hong');
                        type.push(TYPE_SHUNZI);

                    }
                } else if (mid - min == 2) {
                    let pai = mid - 1;
                    if ((tp1 == tp2) && (tp1 == 2 || tp1 == 0)) {
                        //如果两张单牌花色相同 并且为红色的 因为这里是大王当红黑模式
                        if (tp1 == 2) {
                            //红桃
                            pkc[0] = maxType(pai, 'hong');
                        } else if (tp1 == 0) {
                            pkc[0] = maxType(pai, 'fang');
                        }

                        type.push(TYPE_TONGHUASHUN)
                    } else {
                        //花色不同 就随便去一个大点的花色
                        pkc[0] = maxType(pai, 'hong');
                        type.push(TYPE_SHUNZI);

                    }
                    head = mid;
                    middle = pai; //癞子在中间
                    tail = min;
                    laiziPai.push(1); //癞子的下标
                } else if (value(pokers[1]) == 14 && value(pokers[2]) == 2) {
                    let pai = 3;
                    if ((tp1 == tp2) && (tp1 == 2 || tp1 == 0)) {
                        //如果两张单牌花色相同 并且为红色的 因为这里是大王当红黑模式
                        if (tp1 == 2) {
                            //红桃
                            pkc[0] = maxType(pai, 'hong');
                        } else if (tp1 == 0) {
                            pkc[0] = maxType(pai, 'fang');
                        }

                        type.push(TYPE_TONGHUASHUN)
                    } else {
                        //花色不同 就随便去一个大点的花色
                        pkc[0] = maxType(pai, 'hong');
                        type.push(TYPE_SHUNZI);

                    }
                    head = 14;
                    middle = 3;
                    tail = 2;
                    laiziPai.push(1); //癞子的下标
                } else if (value(pokers[1]) == 14 && value(pokers[2]) == 3) {
                    let pai = 2;
                    if ((tp1 == tp2) && (tp1 == 2 || tp1 == 0)) {
                        //如果两张单牌花色相同 并且为红色的 因为这里是大王当红黑模式
                        if (tp1 == 2) {
                            //红桃
                            pkc[0] = maxType(pai, 'hong');
                        } else if (tp1 == 0) {
                            pkc[0] = maxType(pai, 'fang');
                        }

                        type.push(TYPE_TONGHUASHUN)
                    } else {
                        //花色不同 就随便去一个大点的花色
                        pkc[0] = maxType(pai, 'hong');
                        type.push(TYPE_SHUNZI);

                    }
                    head = 14;
                    middle = 3;
                    tail = 2;
                    laiziPai.push(2); //癞子的下标
                } else {
                    let pai = 14; //只是同花的话 肯定变A最大
                    //如果不是顺子，这里只判定同花，同花顺上面已经判定过了
                    if ((tp1 == tp2) && (tp1 == 2 || tp1 == 0)) {
                        //如果两张单牌花色相同 并且为红色的 因为这里是大王当红黑模式 A开头的同花
                        if (tp1 == 2) {
                            //红桃
                            pkc[0] = maxType(pai, 'hong');
                        } else if (tp1 == 0) {
                            pkc[0] = maxType(pai, 'fang');
                        }

                        type.push(TYPE_TONGHUA);
                        head = 14;
                        middle = mid;
                        tail = min;
                        laiziPai.push(0); //癞子的下标
                    } else {
                        //这里既不是顺子 也不是同花 对子就是最大的了 那就变个红桃(大王 当红黑)
                        pai = mid; //找一个最大的单张当对子
                        pkc[0] = maxType(pai, 'hong');
                        type.push(TYPE_DUIZI);
                        if (tp1 == 3) {
                            head = mid;
                            middle = pai;
                            laiziPai.push(1); //癞子的下标
                        } else {
                            head = pai;
                            middle = mid;
                            laiziPai.push(0); //癞子的下标
                        }
                        tail = min;
                    }
                }
            } else {
                //小王 如果两张单排差值为1或2  或者一张是1一张是2或3
                if (mid - min == 1) {
                    let pai;
                    //特殊情况 王 A K
                    if (mid == 14 && min == 13) {
                        pai = 12; //Q

                        head = 14;
                        middle = 13;
                        tail = 12;
                        laiziPai.push(2); //癞子的下标
                    } else {
                        pai = mid + 1;

                        head = pai;
                        middle = mid;
                        tail = min;
                        laiziPai.push(0); //癞子的下标
                    }
                    //如果差1
                    if ((tp1 == tp2) && (tp1 == 3 || tp1 == 1)) {
                        //如果两张单牌花色相同 并且为黑色的 因为这里是小王当红黑模式
                        if (tp1 == 3) {
                            pkc[0] = maxType(pai, 'hei');
                        } else if (tp1 == 1) {
                            pkc[0] = maxType(pai, 'mei');
                        }
                        type.push(TYPE_TONGHUASHUN);

                    } else {
                        //花色不同 就随便去一个大点的花色
                        pkc[0] = maxType(pai, 'hei');
                        type.push(TYPE_SHUNZI);

                    }
                } else if (mid - min == 2) {
                    let pai = mid - 1;
                    if ((tp1 == tp2) && (tp1 == 3 || tp1 == 1)) {
                        //如果两张单牌花色相同 并且为黑色的 因为这里是小王当红黑模式
                        if (tp1 == 3) {
                            //红桃
                            pkc[0] = maxType(pai, 'hei');
                        } else if (tp1 == 1) {
                            pkc[0] = maxType(pai, 'mei');
                        }

                        type.push(TYPE_TONGHUASHUN)
                    } else {
                        //花色不同 就随便去一个大点的花色
                        pkc[0] = maxType(pai, 'hei');
                        type.push(TYPE_SHUNZI);

                    }
                    head = mid;
                    middle = pai; //癞子在中间
                    tail = min;
                    laiziPai.push(1); //癞子的下标
                } else if (value(pokers[1]) == 14 && value(pokers[2]) == 2) {
                    let pai = 3;
                    if ((tp1 == tp2) && (tp1 == 3 || tp1 == 1)) {
                        //如果两张单牌花色相同 并且为红色的 因为这里是大王当红黑模式
                        if (tp1 == 3) {
                            //红桃
                            pkc[0] = maxType(pai, 'hei');
                        } else if (tp1 == 1) {
                            pkc[0] = maxType(pai, 'mei');
                        }

                        type.push(TYPE_TONGHUASHUN)
                    } else {
                        //花色不同 就随便去一个大点的花色
                        pkc[0] = maxType(pai, 'hei');
                        type.push(TYPE_SHUNZI);

                    }
                    head = 14;
                    middle = 3;
                    tail = 2;
                    laiziPai.push(1); //癞子的下标
                } else if (value(pokers[1]) == 14 && value(pokers[2]) == 3) {
                    let pai = 2;
                    if ((tp1 == tp2) && (tp1 == 3 || tp1 == 1)) {
                        //如果两张单牌花色相同 并且为红色的 因为这里是大王当红黑模式
                        if (tp1 == 3) {
                            //红桃
                            pkc[0] = maxType(pai, 'hei');
                        } else if (tp1 == 1) {
                            pkc[0] = maxType(pai, 'mei');
                        }

                        type.push(TYPE_TONGHUASHUN)
                    } else {
                        //花色不同 就随便去一个大点的花色
                        pkc[0] = maxType(pai, 'hei');
                        type.push(TYPE_SHUNZI);

                    }
                    head = 14;
                    middle = 3;
                    tail = 2;
                    laiziPai.push(2); //癞子的下标
                } else {
                    let pai = 14; //只是同花的话 肯定变A最大
                    //如果不是顺子，这里只判定同花，同花顺上面已经判定过了
                    if ((tp1 == tp2) && (tp1 == 3 || tp1 == 1)) {
                        //如果两张单牌花色相同 并且为红色的 因为这里是大王当红黑模式 A开头的同花
                        if (tp1 == 3) {
                            pkc[0] = maxType(pai, 'hei');
                        } else if (tp1 == 1) {
                            pkc[0] = maxType(pai, 'mei');
                        }

                        type.push(TYPE_TONGHUA);
                        head = 14;
                        middle = mid;
                        tail = min;
                        laiziPai.push(0); //癞子的下标
                    } else {
                        //这里既不是顺子 也不是同花 对子就是最大的了 那就变个黑桃(小王 当红黑)
                        pai = mid; //找一个最大的单张当对子
                        pkc[0] = maxType(pai, 'hei');
                        type.push(TYPE_DUIZI);

                        head = pai;
                        middle = mid;
                        laiziPai.push(0); //癞子的下标 反正是黑桃就放第一个
                        tail = min;
                    }
                }
            }
        } else if (laizi == 2) {
            //当任意 不分大小王了把
            if (mid - min == 1) {
                let pai;
                //特殊情况 王 A K
                if (mid == 14 && min == 13) {
                    pai = 12; //Q

                    head = 14;
                    middle = 13;
                    tail = 12;
                    laiziPai.push(2); //癞子的下标
                } else {
                    pai = mid + 1;

                    head = pai;
                    middle = mid;
                    tail = min;
                    laiziPai.push(0); //癞子的下标
                }
                //如果差1
                if (tp1 == tp2) {
                    //如果两张单牌花色相同 
                    if (tp1 == 3) {
                        pkc[0] = maxType(pai, 'hei');
                    } else if (tp1 == 2) {
                        pkc[0] = maxType(pai, 'hong');
                    } else if (tp1 == 1) {
                        pkc[0] = maxType(pai, 'mei');
                    } else if (tp1 == 0) {
                        pkc[0] = maxType(pai, 'fang');
                    }
                    type.push(TYPE_TONGHUASHUN);
                } else {
                    //花色不同 就随便去一个大点的花色
                    pkc[0] = maxType(pai, 'hei');
                    type.push(TYPE_SHUNZI);
                }
            } else if (mid - min == 2) {
                let pai = mid - 1;
                if (tp1 == tp2) {
                    //如果两张单牌花色相同
                    if (tp1 == 3) {
                        pkc[0] = maxType(pai, 'hei');
                    } else if (tp1 == 2) {
                        pkc[0] = maxType(pai, 'hong');
                    } else if (tp1 == 1) {
                        pkc[0] = maxType(pai, 'mei');
                    } else if (tp1 == 0) {
                        pkc[0] = maxType(pai, 'fang');
                    }

                    type.push(TYPE_TONGHUASHUN)
                } else {
                    //花色不同 就随便去一个大点的花色
                    pkc[0] = maxType(pai, 'hei');
                    type.push(TYPE_SHUNZI);

                }
                head = mid;
                middle = pai; //癞子在中间
                tail = min;
                laiziPai.push(1); //癞子的下标
            } else if (value(pokers[1]) == 14 && value(pokers[2]) == 2) {
                let pai = 3;
                if (tp1 == tp2) {
                    //如果两张单牌花色相同
                    if (tp1 == 3) {
                        pkc[0] = maxType(pai, 'hei');
                    } else if (tp1 == 2) {
                        pkc[0] = maxType(pai, 'hong');
                    } else if (tp1 == 1) {
                        pkc[0] = maxType(pai, 'mei');
                    } else if (tp1 == 0) {
                        pkc[0] = maxType(pai, 'fang');
                    }

                    type.push(TYPE_TONGHUASHUN)
                } else {
                    //花色不同 就随便去一个大点的花色
                    pkc[0] = maxType(pai, 'hei');
                    type.push(TYPE_SHUNZI);

                }
                head = 14;
                middle = 3;
                tail = 2;
                laiziPai.push(1); //癞子的下标
            } else if (value(pokers[1]) == 14 && value(pokers[2]) == 3) {
                let pai = 2;
                if (tp1 == tp2) {
                    //如果两张单牌花色相同
                    if (tp1 == 3) {
                        pkc[0] = maxType(pai, 'hei');
                    } else if (tp1 == 2) {
                        pkc[0] = maxType(pai, 'hong');
                    } else if (tp1 == 1) {
                        pkc[0] = maxType(pai, 'mei');
                    } else if (tp1 == 0) {
                        pkc[0] = maxType(pai, 'fang');
                    }

                    type.push(TYPE_TONGHUASHUN)
                } else {
                    //花色不同 就随便去一个大点的花色
                    pkc[0] = maxType(pai, 'hei');
                    type.push(TYPE_SHUNZI);

                }
                head = 14;
                middle = 3;
                tail = 2;
                laiziPai.push(2); //癞子的下标
            } else {
                let pai = 14; //只是同花的话 肯定变A最大
                //如果不是顺子，这里只判定同花，同花顺上面已经判定过了
                if (tp1 == tp2) {
                    //如果两张单牌花色相同
                    if (tp1 == 3) {
                        pkc[0] = maxType(pai, 'hei');
                    } else if (tp1 == 2) {
                        pkc[0] = maxType(pai, 'hong');
                    } else if (tp1 == 1) {
                        pkc[0] = maxType(pai, 'mei');
                    } else if (tp1 == 0) {
                        pkc[0] = maxType(pai, 'fang');
                    }

                    type.push(TYPE_TONGHUA);
                    head = 14;
                    middle = mid;
                    tail = min;
                    laiziPai.push(0); //癞子的下标
                } else {
                    //这里既不是顺子 也不是同花 对子就是最大的了 
                    pai = mid; //找一个最大的单张当对子
                    pkc[0] = maxType(pai, 'hei');
                    type.push(TYPE_DUIZI);

                    head = pai;
                    middle = mid;
                    laiziPai.push(0); //癞子的下标 反正是黑桃就放第一个
                    tail = min;
                }
            }
        }
    } else {
        console.log("没有王", max, mid, min);
        //没有王
        let tp0 = typeColor(pokers[0]);
        let tp1 = typeColor(pokers[1]);
        let tp2 = typeColor(pokers[2]);

        //没有王
        if ((max - min == 2)) {
            //最大的和最小的差值为2
            if (tp0 == tp1 == tp2) {
                //花色相同 同花顺
                type.push(TYPE_TONGHUASHUN);
            } else {
                type.push(TYPE_SHUNZI);
            }
            head = max;
            middle = mid;
            tail = min;
        } else if (max == 0x0E && mid == 0x03 && min == 0x02) {
            // A 3 2
            type.push(TYPE_SHUNZI);
            head = 3;
            middle = 2;
            tail = 1;
        } else {
            //这里只能是 单张了
            type.push(TYPE_DANDIAO);
            head = max;
            middle = mid;
            tail = min;
        }
    }
    //降序 黑红梅方
    pkc.sort(function (a, b) {
        if (a == 0x41 || a == 0x42 || b == 0x41 || b == 0x42) {
            //如果出现了大小王 就先比花色
            if ((a >> 4) == (b >> 4)) {
                return (b & 0x0F) - (a & 0x0F);
            }
            return (b >> 4) - (a >> 4);
        } else {
            if ((b & 0X0F) == (a & 0X0F)) {
                return (b >> 4) - (a >> 4);
            }
            return (b & 0X0F) - (a & 0X0F);
        }
    });
    return { type: type, pokers: pkc, laizi: laiziPai, head: head, mid: middle, tail: tail, hasBig: hasDW, hasSmall: hasXW };

}

exports.compare = function (c1, c2) {
    //return { type: type, pokers: pkc, laizi: laiziPai, head: head, mid: middle, tail: tail, hasBig: hasDW, hasSmall: hasXW };
    console.log('compare:', c1.pokers, c2.pokers);

    //先根据类型
    if (c1.type[0] == c2.type[0]) {
        //如果类型相同 比 头 中 尾大小 head是必须有的
        if (c1.head == c2.head) {
            //头相同比中
            if (c1.mid == null || c1.mid == -1 || (c1.mid == c2.mid)) {
                //如果没有中或者中相等
                if (c1.tail == null || c1.mid == -1 || (c1.tail == c2.tail)) {
                    //到这里了，说明头中尾都相等（或没有中尾） 比花色
                    if (c1.type[0] == 2) {
                        //对子和其他的不太一样，先判断的是那张单的牌的花色
                        let cd1 = duiziDan(c1.pokers); //c1的单张
                        let cd2 = duiziDan(c2.pokers); //c2的单张
                        //对子带的单张不可能颜色相同 不然就是三条了
                        return typeColor(cd2) - typeColor(cd1);
                    } else {
                        //除了对子之外的都是从大往小 比花色
                        let tc10 = typeColor(c1.pokers[0])
                        let tc11 = typeColor(c1.pokers[1])
                        let tc12 = typeColor(c1.pokers[2])

                        let tc20 = typeColor(c2.pokers[0])
                        let tc21 = typeColor(c2.pokers[1])
                        let tc22 = typeColor(c2.pokers[2])

                        if (tc10 == tc20) {
                            //最大的牌的花色相等 继续往下比(就不肯能了，有两张王不是不是三条呢？)
                            if (tc11 == tc21) {
                                console.log("这里是不可能进来的！");
                                return tc22 - tc12;
                            } else {
                                return tc21 - tc11;
                            }
                        } else {
                            return tc20 - tc10;
                        }
                    }

                } else {
                    return c2.tail - c1.tail;
                }
            } else {
                return c2.mid - c1.mid;
            }
        } else {
            return c2.head - c1.head;
        }
    } else {
        //类型不相同就简单了
        return c2.type[0] - c1.type[0];
    }
}

/**
 * 检查喜牌
 * @param {param} seatData 
 */
exports.checkXiPai = function (seatData) {
    let sd = seatData;

    let first = sd.firstPai;
    let middle = sd.midPai;
    let last = sd.lastPai;
    console.log('checkxipai ---', first, middle, last);

    //三清
    if (first.type == 4 && middle.type == 4 && last.type == 4) {
        sd.isSQ = true;
    }
    //全黑
    if (checkAllBlack(first, middle, last)) {
        sd.isAB = true;
    }
    //全红
    if (checkAllRed(first, middle, last)) {
        sd.isAR = true;
    }
    //双顺清
    if (checkShunQingNum(first, middle, last) == 2) {
        sd.isDBQ = true;
    }
    //三顺清
    if (checkShunQingNum(first, middle, last) == 3) {
        sd.isTBQ = true;
    }
    //双三条
    if (checkSanTiaoNum(first, middle, last) == 2) {
        sd.isDBST = true;
    }
    //全三条
    if (checkSanTiaoNum(first, middle, last) == 3) {
        sd.isAST = true;
    }
    //四个头
    let touNum = checkFourTouNum(first, middle, last);
    if (touNum > 0) {
        sd.isFT = true;
        sd.ftNum = touNum;
    }
    //连顺
    if (checkLianShun(first, middle, last)) {
        sd.isLS = true;
    }
    //清连顺
    if (checkQingLianShun(first, middle, last)) {
        sd.isQLS = true;
    }
}

//检查全黑
function checkAllBlack(first, middle, last) {
    for (let i = 0; i < 3; ++i) {
        let pokers;
        if (i == 0) {
            pokers = first.pokers;
        } else if (i == 1) {
            pokers = middle.pokers;
        } else {
            pokers = last.pokers;
        }

        for (let [len, j] = [pokers.length, 0]; j < len; ++j) {
            let tpc = typeColor(pokers[j]);
            if (tpc != 3 && tpc != 1) {
                //如果有一张不是黑色，跳出
                return false;
            }
        }
    }
    //全部检查完成
    return true;
}

//检查全红
function checkAllRed(first, middle, last) {
    for (let i = 0; i < 3; ++i) {
        let pokers;
        if (i == 0) {
            pokers = first.pokers;
        } else if (i == 1) {
            pokers = middle.pokers;
        } else {
            pokers = last.pokers;
        }

        for (let [len, j] = [pokers.length, 0]; j < len; ++j) {
            let tpc = typeColor(pokers[j]);
            if (tpc != 2 && tpc != 0) {
                //如果有一张不是黑色，跳出
                return false;
            }
        }
    }
    //全部检查完成
    return true;
}

//检查顺清数量（双顺清 三顺清）
function checkShunQingNum(first, middle, last) {
    let num = 0;
    if (first.type == 5) {
        num++;
    }
    if (middle.type == 5) {
        num++;
    }
    if (last.type == 5) {
        num++;
    }
    return num;
}

//检查三条数量（双三条 全三条）
function checkSanTiaoNum(first, middle, last) {
    let num = 0;
    if (first.type == 6) {
        num++;
    }
    if (middle.type == 6) {
        num++;
    }
    if (last.type == 6) {
        num++;
    }
    return num;
}

//检查四个头 （可有多个）
function checkFourTouNum(first, middle, last) {
    let num = 0;
    if (first.type[0] != 6 && middle.type[0] != 6 && last.type[0] != 6) {
        //如果都没有三条
        return num;
    }

    let normalArr = new Array();


    if (first.type[0] == 6) {
        if (!first.hasBig && !first.hasSmall) {
            normalArr.push(0);
        }
    }
    if (middle.type[0] == 6) {
        if (!middle.hasBig && !middle.hasSmall) {
            normalArr.push(1);
        }
    }
    if (last.type[0] == 6) {
        if (!last.hasBig && !last.hasSmall) {
            normalArr.push(2);
        }
    }

    if (normalArr.length == 3 || normalArr.length == 0) {
        //如果有三个天然三条 那就没有四个一样的了
        return num; // 0
    }
    for (let [i, len] = [0, normalArr.length]; i < len; ++i) {
        if (normalArr[i] == 0) { //first
            //first是天然三条，去其两个数组找一样的牌，王变得不算
            let pai = first.head;
            let flag = false;
            for (let [j, len] = [0, middle.pokers.length]; j < len; +j) {
                if (value(middle.pokers[j]) == pai && !middle.hasBig && !middle.hasSmall) {
                    //牌值一样并且没有王
                    num++;
                    flag = true;
                    break;
                } else {
                    //否则判断一下下标 laizi中存的是王在pokers里的下标
                    if (j != middle.laizi[0] && j != middle.laizi[1]) {
                        num++;
                        flag = true;
                        break;
                    }
                }
            }
            if (flag) {
                continue;
            }
            for (let [j, len] = [0, last.pokers.length]; j < len; +j) {
                if (value(last.pokers[j]) == pai && !last.hasBig && !last.hasSmall) {
                    //牌值一样并且没有王
                    num++;
                    break;
                } else {
                    //否则判断一下下标 laizi中存的是王在pokers里的下标
                    if (j != last.laizi[0] && j != last.laizi[1]) {
                        num++;
                        break;
                    }
                }
            }
        } else if (normalArr[i] == 1) { //middle
            let pai = first.head;
            let flag = false;
            for (let [j, len] = [0, first.pokers.length]; j < len; +j) {
                if (value(first.pokers[j]) == pai && !first.hasBig && !first.hasSmall) {
                    //牌值一样并且没有王
                    num++;
                    flag = true;
                    break;
                } else {
                    //否则判断一下下标 laizi中存的是王在pokers里的下标
                    if (j != first.laizi[0] && j != first.laizi[1]) {
                        num++;
                        flag = true;
                        break;
                    }
                }
            }
            if (flag) {
                continue;
            }
            for (let [j, len] = [0, last.pokers.length]; j < len; +j) {
                if (value(last.pokers[j]) == pai && !last.hasBig && !last.hasSmall) {
                    //牌值一样并且没有王
                    num++;
                    break;
                } else {
                    //否则判断一下下标 laizi中存的是王在pokers里的下标
                    if (j != last.laizi[0] && j != last.laizi[1]) {
                        num++;
                        break;
                    }
                }
            }
        } else if (normalArr[i] == 2) { //last
            let pai = first.head;
            let flag = false;
            for (let [j, len] = [0, middle.pokers.length]; j < len; +j) {
                if (value(middle.pokers[j]) == pai && !middle.hasBig && !middle.hasSmall) {
                    //牌值一样并且没有王
                    num++;
                    flag = true;
                    break;
                } else {
                    //否则判断一下下标 laizi中存的是王在pokers里的下标
                    if (j != middle.laizi[0] && j != middle.laizi[1]) {
                        num++;
                        flag = true;
                        break;
                    }
                }
            }
            if (flag) {
                continue;
            }
            for (let [j, len] = [0, first.pokers.length]; j < len; +j) {
                if (value(first.pokers[j]) == pai && !first.hasBig && !first.hasSmall) {
                    //牌值一样并且没有王
                    num++;
                    break;
                } else {
                    //否则判断一下下标 laizi中存的是王在pokers里的下标
                    if (j != first.laizi[0] && j != first.laizi[1]) {
                        num++;
                        break;
                    }
                }
            }

        }
    }

    return num;
}

//检查连顺 9个连在一起
function checkLianShun(first, middle, last) {
    if ((first.type[0] != 3 && first.type[0] != 5) || (middle.type[0] != 3 && middle.type[0] != 5) || (last.type[0] != 3 && last.type[0] != 5)) {
        //如果有一个不是顺子或者同花顺 那检查个毛啊。
        return false;
    }
    //文档上说必须是123 456 789 对应 头中尾这种，顺序不能乱，不然不算 （预留先）
    if (first.head > middle.head || middle.head > last.head || first > last.head) {
        return false;
    }

    let paiArr = new Array().concat(first.pokers, middle.pokers, last.pokers);
    //降序排序
    paiArr.sort(function (a, b) {
        if (a == 0x41 || a == 0x42 || b == 0x41 || b == 0x42) {
            //如果出现了大小王 就先比花色
            if ((a >> 4) == (b >> 4)) {
                return (b & 0x0F) - (a & 0x0F);
            }
            return (b >> 4) - (a >> 4);
        } else {
            if ((b & 0X0F) == (a & 0X0F)) {
                return (b >> 4) - (a >> 4);
            }
            return (b & 0X0F) - (a & 0X0F);
        }
    });
    console.log('checkLianShun ---', paiArr);

    //如果最大的是A，没王的话A最大 并且第二大的牌减去最后一张牌等于
    if (value(paiArr[0]) == 14 && (value(paiArr[1]) - value(paiArr[paiArr.length - 1]) == 7)) {
        return true;
    } else if (value(paiArr[0]) - value(paiArr[paiArr.length - 1]) == 8) {
        return true;
    }
    return false;
}

//检查清连顺 9个连在一起
function checkQingLianShun(first, middle, last) {
    if (!checkLianShun(first, middle, last)) {
        //先检查是不是顺子 不是就不用检查了
        return false;
    }

    let paiArr = new Array().concat(first.pokers, middle.pokers, last.pokers);

    let color = -1;
    for (let [i, len] = [0, paiArr.length]; i < len; ++i) {
        //如果有一张花色不一样就gg
        if (color < 0) {
            color = typeColor(paiArr[i]); //记录颜色 后面出现不一样的就直接返回
        } else if (typeColor(paiArr[i]) != color) {
            return false;
        }
    }
    return true;
}

//对子数组，返回那个单张的 简单粗暴
function duiziDan(pokers) {
    if (value(pokers[0]) == value(pokers[1])) {
        return pokers[2];
    } else if (value(pokers[0]) == value(pokers[2])) {
        return pokers[1];
    } else if (value(pokers[1]) == value(pokers[2])) {
        return pokers[0];
    }
}

//数值
function value(poker) {  // 扑克数值
    return poker & 0x0f;
}

//花色
function typeColor(poker) {
    return poker >> 4;
}

//返回一个牌型的最大的16进制值 懒得想了 简单粗暴
function maxType(pai, color) {
    if (color == 'hei') {
        if (pai == 2) {
            return 0x32;
        } else if (pai == 3) {
            return 0x33;
        } else if (pai == 4) {
            return 0x34;
        } else if (pai == 5) {
            return 0x35;
        } else if (pai == 6) {
            return 0x36;
        } else if (pai == 7) {
            return 0x37;
        } else if (pai == 8) {
            return 0x38;
        } else if (pai == 9) {
            return 0x39;
        } else if (pai == 10) {
            return 0x3A;
        } else if (pai == 11) { //J
            return 0x3B;
        } else if (pai == 12) { //Q
            return 0x3C;
        } else if (pai == 13) { //K
            return 0x3D;
        } else if (pai == 14) { //A
            return 0x3E;
        }
    } else if (color == 'hong') {
        if (pai == 2) {
            return 0x22;
        } else if (pai == 3) {
            return 0x23;
        } else if (pai == 4) {
            return 0x24;
        } else if (pai == 5) {
            return 0x25;
        } else if (pai == 6) {
            return 0x26;
        } else if (pai == 7) {
            return 0x27;
        } else if (pai == 8) {
            return 0x28;
        } else if (pai == 9) {
            return 0x29;
        } else if (pai == 10) {
            return 0x2A;
        } else if (pai == 11) { //J
            return 0x2B;
        } else if (pai == 12) { //Q
            return 0x2C;
        } else if (pai == 13) { //K
            return 0x2D;
        } else if (pai == 14) { //A
            return 0x2E;
        }
    } else if (color == 'mei') {
        if (pai == 2) {
            return 0x12;
        } else if (pai == 3) {
            return 0x13;
        } else if (pai == 4) {
            return 0x14;
        } else if (pai == 5) {
            return 0x15;
        } else if (pai == 6) {
            return 0x16;
        } else if (pai == 7) {
            return 0x17;
        } else if (pai == 8) {
            return 0x18;
        } else if (pai == 9) {
            return 0x19;
        } else if (pai == 10) {
            return 0x1A;
        } else if (pai == 11) { //J
            return 0x1B;
        } else if (pai == 12) { //Q
            return 0x1C;
        } else if (pai == 13) { //K
            return 0x1D;
        } else if (pai == 14) { //A
            return 0x1E;
        }
    } else if (color == 'fang') {
        if (pai == 2) {
            return 0x02;
        } else if (pai == 3) {
            return 0x03;
        } else if (pai == 4) {
            return 0x04;
        } else if (pai == 5) {
            return 0x05;
        } else if (pai == 6) {
            return 0x06;
        } else if (pai == 7) {
            return 0x07;
        } else if (pai == 8) {
            return 0x08;
        } else if (pai == 9) {
            return 0x09;
        } else if (pai == 10) {
            return 0x0A;
        } else if (pai == 11) { //J
            return 0x0B;
        } else if (pai == 12) { //Q
            return 0x0C;
        } else if (pai == 13) { //K
            return 0x0D;
        } else if (pai == 14) { //A
            return 0x0E;
        }
    }
}

// =======================测试============================

// var tPokers1 = [0x33, 0x13, 0x03];
// var tPokers2 = [0x23, 0x06, 0x39];
// var tPokers3 = [0x41, 0x09, 0x19];
// var tPokers4 = [0x41, 0x32, 0x13];
// var tPokers5 = [0x4b, 0x2b, 0x3b];


// var tLaiZi = 2;
// var a = exports.getPokersType(tPokers1, tLaiZi);
// console.log(a);

// var b = exports.getPokersType(tPokers2, tLaiZi);
// console.log(b);

// var c = exports.getPokersType(tPokers3, tLaiZi);
// console.log(c);

// var d = exports.getPokersType(tPokers4, tLaiZi);
// console.log(d);

// var e = exports.getPokersType(tPokers5, tLaiZi);
// console.log(e);

// var arr = new Array;
// arr.push(a, b, c, d, e);

// arr.sort(exports.compare);
// console.log(arr);
// console.log(checkFourTouNum(a, b, c))