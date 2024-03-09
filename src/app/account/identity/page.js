// "use client"
// import React, {useState, useEffect} from "react";
// import { useRouter } from 'next/navigation';

// import { Button, Form, Row , Col, Input, DatePicker, Select, Radio, message, Spin  } from "antd";
// import { UploadOutlined } from "@ant-design/icons";

// import { updateIdentity } from "@apis/users";

// import Header from "@components/Header";

// import _ from "lodash";
// import dayjs from "dayjs";

// import { cities_and_districts_wards } from 'utils/constants';
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@utils/firebase";

const ProfilePage = () => {
  // const router = useRouter(); 
  // onst [user] = useAuthState(auth);
  // const token = user?.accessToken

  // const [form] = Form.useForm();
  // const [loading, setLoading] = useState(false);

  // const [identityType , setIdentityType] = React.useState('CCCD');

  // const [id_front_photo_base64, setId_front_photo_base64] = useState();
  // const [id_back_photo_base64, setId_back_photo_base64] = useState();
  
  // const onChangeIdentityType= e => {
  //   setIdentityType(e.target.value);
  // };

  // const handleChange = name => e => {
  //   if (name === 'front') {
  //     var file = e.target.files[0];
  //     var reader = new FileReader();
  //     reader.onloadend = function() {
  //       setId_front_photo_base64(reader.result)
  //     }
  //     reader.readAsDataURL(file);
  //   }

  //   if (name === 'backside') {
  //     var file = e.target.files[0];
  //     var reader = new FileReader();
  //     reader.onloadend = function() {
  //       setId_back_photo_base64(reader.result)
  //     }
  //     reader.readAsDataURL(file);
  //   }
  // };

  // useEffect(()=> {
  //   setId_front_photo_base64(_.get(user, "id_front_photo_base64"));
  //   setId_back_photo_base64(_.get(user, "id_back_photo_base64"))
  // }, [user])

  return (
    //   <main className="w-full">
    //   <Header isBack={true} />
    //   <div class="px-0 sm:px-4 dark:bg-gray-900">
    //     {user === undefined ? 
    //       <p style={{textAlign: 'center', marginTop: 2}}>
    //         <Spin style={{marginTop: 20}} />
    //       </p>
    //       :
    //       <Form
    //           form={form}
    //           layout="vertical"
    //           name="info"
    //           onFinish={(values) => {
    //               setLoading(true);
    //               values.identityType = identityType;
    //               values.id_front_photo_base64 = id_front_photo_base64;
    //               values.id_back_photo_base64 = id_back_photo_base64;

    //               // if (photoCCCDFront) {
    //               //   uploadCCCDFrontPhoto(photoCCCDFront, token)
    //               //   .then(() => {
    //               //     setLoading(false);
    //               //     message.success("Cập nhật thành công");
    //               //   })
    //               //   .catch(() => setLoading(false));
    //               // }

    //               // if (photoCCCDBackside) {
    //               //   uploadCCCDBacksidePhoto(photoCCCDBackside, token)
    //               //   .then(() => {
    //               //     setLoading(false);
    //               //     message.success("Cập nhật thành công");
    //               //   })
    //               //   .catch(() => setLoading(false));
    //               // }

    //               updateIdentity(values, token)
    //               .then(() => {
    //                 setLoading(false);
    //                 message.success("Cập nhật thành công");
    //                 router.back()
    //               })
    //               .catch(() => {
    //                 setLoading(false)
    //                 message.warning("Cập nhật thất bại!");
    //               });
    //           }}
    //           initialValues={{
    //             identityNo: _.get(user, "identityNo"),
    //             birthday: dayjs(_.get(user, "birthday")),
    //             identityDate: dayjs(_.get(user, "identityDate")),
    //             city: _.get(user, "city"),
    //           }}
    //       >
    //           <Row>
    //               <Col>Chọn loại giấy tờ</Col>
    //           </Row>
    //           <Row style={{marginTop: 5}}>
    //               <Col>
    //                   <Radio.Group onChange={onChangeIdentityType} value={identityType} size={'large'}>
    //                       <Radio value={'CCCD'}>CCCD</Radio>
    //                       <Radio value={'CMND'} style={{marginLeft: 24}}>CMND</Radio>
    //                   </Radio.Group>
    //               </Col>
    //           </Row>
    //           <Row gutter={24} style={{marginTop: 24}}>
    //               <Col lg={{ span: 12 }} xs={{ span: 24 }}>
    //                 <Form.Item 
    //                     name="identityNo" 
    //                     label={`Số ${identityType}`}
    //                     rules={[{ required: true, message: `Vui lòng nhập Số ${identityType}!` }]}
    //                 >
    //                     <Input 
    //                         size={'large'}
    //                         placeholder={`Số ${identityType}`}
    //                     />
    //                 </Form.Item>
    //               </Col>
    //               <Col lg={{ span: 12 }} xs={{ span: 24 }}>
    //                   <Form.Item 
    //                       name="birthday" 
    //                       label="Ngày sinh"
    //                       rules={[{ required: true, message: 'Vui lòng nhập Ngày sinh!' }]}
    //                   >
    //                       <DatePicker placeholder="" style={{width: '100%'}} size={'large'} />
    //                   </Form.Item>
    //               </Col>
    //               <Col lg={{ span: 12 }} xs={{ span: 24 }}>
    //                   <Form.Item 
    //                       name="identityDate" 
    //                       label="Ngày cấp"
    //                       rules={[{ required: true, message: 'Vui lòng nhập Ngày cấp!' }]}
    //                   >
    //                       <DatePicker placeholder="" style={{width: '100%'}} size={'large'} />
    //                   </Form.Item>
    //               </Col>
    //               <Col lg={{ span: 12 }} xs={{ span: 24 }}>
    //                   <Form.Item
    //                     name="city"
    //                     label={'Nơi cấp'}
    //                     rules={[
    //                         { 
    //                         required: true, 
    //                         message: 'Vui lòng chọn Tỉnh / Thành phố!' 
    //                         }
    //                     ]}
    //                   >
    //                     <Select 
    //                       size={'large'}
    //                           showSearch
    //                           style={{ width: '100%' }}
    //                           placeholder={'Chọn Tỉnh / Thành phố'}
    //                           optionFilterProp="children"
    //                           filterOption={(input, option) =>{
    //                               return (
    //                                   option.keywords.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    //                               )
    //                           }}
    //                           >
    //                           {cities_and_districts_wards && cities_and_districts_wards.map((item) => <Select.Option value={item.value} keywords={item.keywords}>{item.value}</Select.Option>)}
    //                     </Select>
    //                   </Form.Item>
    //               </Col>
    //               <Col lg={{ span: 24 }} xs={{ span: 24 }}>
    //                 <p>Hình ảnh giấy tờ tuỳ thân (.jpg, .jpeg, .png)</p>
    //               </Col>
    //               <Col lg={{ span: 8 }} xs={{ span: 24 }}>
    //                 <Form.Item>
    //                   <Input
    //                     id='photoFront'
    //                     name="photoFront"
    //                     placeholder="Photo"
    //                     //accept="image/*" 
    //                     accept="image/jpg, image/jpeg, image/png" 
    //                     type="file"
    //                     hidden
    //                     onChange={handleChange('front')}
    //                   />
    //                   <label htmlFor="photoFront" className="ant-btn ant-btn-lg ant-btn-block" style={{paddingTop: 5}}><UploadOutlined /> Mặt trước</label>
                      
    //                   <div style={{ alignItems: 'center', marginTop: 10}}>
    //                     <img style={{width: '100%'}} src={id_front_photo_base64 !== '' ? id_front_photo_base64 : ''} />
    //                   </div>
    //                 </Form.Item>
    //               </Col>
    //               <Col lg={{ span: 8 }} xs={{ span: 24 }}>
    //                 <Form.Item>
    //                   <Input
    //                     id='photoBackside'
    //                     name="photoBackside"
    //                     placeholder="Photo"
    //                     //accept="image/*" 
    //                     accept="image/jpg, image/jpeg, image/png" 
    //                     type="file"
    //                     hidden
    //                     onChange={handleChange('backside')}
    //                   />
    //                   <label htmlFor="photoBackside" className="ant-btn ant-btn-lg ant-btn-block" style={{paddingTop: 5}}><UploadOutlined /> Mặt sau</label>
                      
    //                   <div style={{ alignItems: 'center', marginTop: 10}}>
    //                     <img style={{maxWidth: '100%'}} src={id_back_photo_base64 !== '' ? id_back_photo_base64 : ''} />
    //                   </div>
    //                 </Form.Item>
    //               </Col>
    //           </Row>
              
    //           <Row gutter={24} type="flex" style={{marginTop: 20, background:"#c80000"}}>
    //               <Col lg={{ span: 24 }} xs={{ span: 24 }}>
    //                   <Form.Item>
    //                       {loading === false ?
    //                           <Button type="primary" size={'large'} block htmlType="submit">
    //                             Cập nhật
    //                           </Button>
    //                       :
    //                           <Button type="primary" size={'large'} block loading>
    //                           Loading
    //                           </Button>
    //                       }
    //                   </Form.Item>
    //               </Col>
    //           </Row>
              
    //       </Form>
    //     }
    //   </div>
    // </main>
    <div></div>
  );
};

export default ProfilePage;
