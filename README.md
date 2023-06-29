# 화물 용달 예약/조회 시스템
화물 운송 서비스를 앱을 통해 쉽게 이용할 수 있게 만들어진 시스템으로, 소비자가 예약 및 조회를 할 수 있고 기사가 예약 알림을 받을 수 있도록 시스템을 구성하였습니다.

### Required Repository
- **[Notification API server (알림 서버)](https://github.com/kwakjaeyoon/devops-Final-notification-api)** 
- **[IaC with Terraform](https://github.com/kwakjaeyoon/devops-Final-IaC)** 


### System Architecture
![image](https://github.com/kwakjaeyoon/devops-Final-reserve-api/assets/61172855/12495248-5ba3-4c49-aadb-e6555717ce72)

- 소비자가 상,하차지 등 운송정보를 입력하면,해당 플랫폼을 통해 요청이 드라이버에게 전달이 되는 서비스를 구현
- 예약에 관련된 기능을 수행하는 API 서버가 구 현되어 있으며, 이는 ELB와 Auto Scaling을 통해 가용성을 보장하고 확장을 용이하게 함. 
- 예약 API 서버의 각 기능이 수행된 후, 분석 가능하게 하기 위하여 ElasticSearch에 예약 정보에 대한 로깅
- 예약 정보 조회 시 빠른 조회를 위한 ElasticCache (Cache가 비어있으면 데이터베이스에서 조회)
- 예약 정보를 RDS를 통해 저장 
- 사용자가 예약을 한 경우 해당내용에 대한 알림 메시지를 드라이버에게 전달하기위한 SQS 구현
- SQS로 전달된 메시지를 소비 및 기사에게 전달하기 위한 알림 API 서버 (알림 서버에서 메시지 소비/삭제) 
- 위 인프라를 Terraform코드로 구현








## Installation


```sh
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt i nodejs
sudo apt i npm
```
[Ref: initial.sh](https://github.com/kwakjaeyoon/devops-Final-reserve-api/blob/main/scripts/initialize.sh)


## Development setup

test:
```sh
npm run test
```

dev: [dev link](https://github.com/kwakjaeyoon/devops-Final-reserve-api/blob/main/scripts/start.sh)

## Team Menber
- [Lee JaeMin (PL)](https://github.com/Jaeminst)
- [Kim ChangKi](https://github.com/kimminlo)
- [Kwak JaeYoon (me)](https://github.com/kwakjaeyoon)

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/kwakjaeyoon/devops-Final-reserve-api/blob/main/LICENSE) file for details
