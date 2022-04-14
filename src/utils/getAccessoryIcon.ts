import { SvgProps } from 'react-native-svg';

import SpeedSvg from '../assets/speed.svg';
import AccelerationSvg from '../assets/acceleration.svg';
import ForceSvg from '../assets/force.svg';
import GasolineSvg from '../assets/gasoline.svg';
import EnergySvg from '../assets/energy.svg';
import HybridSvg from '../assets/hybrid.svg';
import ExchangeSvg from '../assets/exchange.svg';
import PeopleSvg from '../assets/people.svg';
import CarSvg from '../assets/car.svg';

const getAccessoryIcon = (type: string): React.FC<SvgProps> => {
  switch (type) {
    case 'speed':
      return SpeedSvg;
    case 'acceleration':
      return AccelerationSvg;
    case 'force':
      return ForceSvg;
    case 'gasoline':
      return GasolineSvg;
    case 'gasoline_motor':
      return GasolineSvg;
    case 'energy':
      return EnergySvg;
    case 'electric':
      return EnergySvg;
    case 'hybrid':
      return HybridSvg;
    case 'hybrid_motor':
      return HybridSvg;
    case 'exchange':
      return ExchangeSvg;
    case 'people':
      return PeopleSvg;
    default:
      return CarSvg;
  }
};
export default getAccessoryIcon;
