import { PipeTransform, Injectable } from "@nestjs/common";
import { GetStationsReqDto } from "../dto";

@Injectable()
export class GetStationsPipe implements PipeTransform {
    transform(getStationsDto: GetStationsReqDto): GetStationsReqDto {
        const { lat, long, dist } = getStationsDto;
        getStationsDto.lat = Number(lat);
        getStationsDto.long = Number(long);
        getStationsDto.dist = Number(dist);

        return getStationsDto;
    }
}
