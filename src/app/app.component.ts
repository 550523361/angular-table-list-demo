import {Component, OnInit} from '@angular/core';
import {TableListConfig} from  "angular-component-table"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = '数据分页列表演示组件';

  query={
    beforeQuery:[
      (param:any)=>{
        console.log("checkFun1",param)
        return true;
      },
      (param:any)=>{
        console.log("checkFun2",param)
        //alert("XXXX怒能为空啊啊啊啊")
        return true;
      },
      (param:any)=>{
        console.log("checkFun3",param)
        return true;
      }
    ],
    queryElements:[
      {
        type:'hidden',
        prop:"upShelves",
        value:"1"
      },
      {
        label:'请选择省',
        type:'select',
        placeholder:'请输入省',
        dataUrl:'citys/queryOpeningCitiesList.json',
        prop:'provinceId',
        initQuery:true,
        defaultValue:"",
        propList:'provinceList',
        propKeyList:'provinceList',
        propValueList:'citiesList',
        casecadeParen:"",
        casecadeChild:"cityId",
        casecadeGrandsonList:["cityId","districtId","communityId"]
      },
      {
        label:'请选择市',
        type:'select',
        defaultValue:"",
        placeholder:'请输入市',
        dataUrl:'citys/queryOpeningCitiesList.json',
        prop:'cityId',
        extendsProp:["pid"],
        propList:'cityList',
        propKeyList:'cityList',
        propValueList:'citiesList',
        casecadeParen:"provinceId",
        casecadeChild:"districtId",
        casecadeGrandsonList:["districtId","communityId"]
      },
      {
        label:'请选择区',
        defaultValue:"",
        type:'select',
        dataUrl:'citys/queryOpeningCitiesList.json',
        placeholder:'请选择区',
        prop:'districtId',
        extendsProp:["pid"],
        propList:'districtList',
        propKeyList:'districtList',
        propValueList:'citiesList',
        casecadeParen:"cityId",
        casecadeChildDataUrl:"community/queryCommunitiesList.json",
        casecadeChildListProp:"data",
        casecadeChild:"",
        queryParam:"cityId"
      },
      {
        label:'小区名称',
        type:'input',
        placeholder:'小区名称',
        prop:'communityIdStr'
      },
      {
        label:'商品名称',
        type:'input',
        placeholder:'商品名称',
        prop:'name'
      },
      {
        label:'优惠券类型',
        type:'input',
        placeholder:'商品名称',
        prop:'activityType',
        value:"0"
      },
      {
        label:'优惠券类型',
        type:'input',
        placeholder:'商品名称',
        prop:'couponState',
        value:"active"
      },
      {
        label:'商品类型',
        placeholder:'请选择商品类型',
        defaultValue:"",
        type:'select',
        casecadeChild:'',
        switchElements:[
          {
            whenSwitchValue:'1',
            label:'电商商品分类',
            initQuery:false,
            defaultValue:"",
            type:'select',
            placeholder:'请选择',
            dataUrl:'mall/goods/queryCategoryList.json?type=1&',
            prop:'categoryId',
            propList:'categoryList',
            propKeyList:'categoryList',
            propValueList:'categoryList',
            casecadeParen:"",
            dropProps:["pid"],
            casecadeChild:"",
            casecadeGrandsonList:[""]
          },
          {
            whenSwitchValue:'2',
            type:'select',
            label:'服务分类',
            initQuery:false,
            defaultValue:"",
            placeholder:'请选择',
            dataUrl:'mall/goods/queryCategoryList.json?type=2&',
            prop:'pid',
            propList:'categoryList',
            propKeyList:'categoryList',
            propValueList:'categoryList',
            casecadeParen:"",
            casecadeChild:"categorySubId",
            casecadeGrandsonList:["categoryId"]
          },
          {
            whenSwitchValue:'2',
            type:'select',
            label:'二级分类',
            defaultValue:"",
            placeholder:'请选择',
            initQuery:false,
            dataUrl:'mall/goods/queryCategoryList.json?type=2&',
            prop:'categorySubId',
            propList:'categorySubList',
            propKeyList:'categorySubList',
            propValueList:'categoryList',
            casecadeParen:"categoryId",
            casecadeChild:"",
            casecadeGrandsonList:[]
          }
        ],
        options:[
          {label:'电商',value:'1'},
          {label:'服务',value:'2'},
        ],
        prop:'goodsType'
      },
      {
        label:'搜索',
        type:'search',
        check: function (queryParam:any) {
          console.log("queryParamqueryParamqueryParam",queryParam);
          if(queryParam){
            var communityName=queryParam.communityName||"";
            communityName=communityName.replace(/^\s+/,"").replace(/\s+$/,"");
            if(communityName==""){
              return true;
            }

          }
          return true;
        }
      }   ,
      {
        label:'批量下架',
        type:'button',
        param:true,
        click: function (data:any,list:any) {
          let checkList:any=[].filter.call(list,(item:any)=>{return item.checked;})
          console.log(data,checkList);
        }
      },
      {
        label:'导出',
        type:'button',
        param:true,
        listener: function (queryParam:any,dataList:any) {
          console.log(queryParam,dataList);
        },
        click: function (queryParam:any,dataList:any) {
          console.log(queryParam,dataList);
        }
      }
    ]
  };
  listUserConfig:TableListConfig;

  /**
   * 数据适配器 当你的数据结构与组件不一致时候 使用此转换器来让组件配合数据接口正常显示你的数据
   * @param listData 接口返回的原始数据 这个返回你可以继承service方法来复写适合你的数据接口
   * @returns {any}
   */
  listAdapter(listData:any){
    let result:any=listData.page;
    result["dataPerPage"]=result.content.map((item:any)=>item.user);
    return result;
  }
  ngOnInit(){
    this.listUserConfig=new TableListConfig("coupons/search/getPlatformCouponPageList.json",
        [
          {label:'选择',type:"checkbox",prop:"id"},
          {label:"优惠券名称",prop:"couponName"},
        ],
        [{label:"修改",click:function (item:any) {console.log(item)}},{label:"",map:{1:'查看',2:'修改',3:'停止'},prop:"status"},{label:"查看"}],
        this.query,
        "get",
        null,
        /*"http://localhost/ejiazi-backend/",
         {
         pageSizeProp:"size",
         pageSizeQueryProp:"size",
         pageNumProp:"number",
         pageNumQueryProp:"number",
         totalRowsProp:"total",
         pageSize:3
         }*/
    );
    this.listUserConfig.pager.pageSize=3;
  }

}
