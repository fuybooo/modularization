!function (t) {    "use strict";    t.fn.bootstrapTable.locales["zh-CN"] = {        formatLoadingMessage: function () {            return "正在努力地加载数据中，请稍候……"        },/* formatRecordsPerPage: function (t) {            return "每页显示 " + t + " 条记录"        }, formatShowingRows: function (t, r, n) {            return "显示第 " + t + " 到第 " + r + " 条记录，总共 " + n + " 条记录"        },*/        formatRecordsPerPage: function (pageNumber) {            return '每页显示 ' + pageNumber + ' 条';        },        formatShowingRows: function (pageFrom, pageTo, totalRows) {            return '共 ' + totalRows + ' 条';        },formatSearch: function () {            return "搜索"        }, formatNoMatches: function () {            return "没有找到匹配的记录"        }, formatPaginationSwitch: function () {            return "隐藏/显示分页"        }, formatRefresh: function () {            return "刷新"        }, formatToggle: function () {            return "切换"        }, formatColumns: function () {            return "列"        }, formatExport: function () {            return "导出数据"        }, formatClearFilters: function () {            return "清空过滤"        }    }, t.extend(t.fn.bootstrapTable.defaults, t.fn.bootstrapTable.locales["zh-CN"])}(jQuery);