// src/store/pieces.store.ts
import { create } from 'zustand';

interface Piece {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  quantity: number;
  price: number;
  report: string;
  departmentName?: string;
}

interface PiecesState {
  pieces: Piece[];
  filteredPieces: Piece[];
  fetchPieces: () => void;
  setFilter: (term: string | { code?: string }) => void;
  setDepartmentFilter: (departmentId: string) => void;
}

export const usePiecesStore = create<PiecesState>((set) => ({
  pieces: [
    // BRAKES - Vehicle Dynamics (VD)
    { id: 'BR1', code: 'BR-1', name: 'BALANCE CAR', departmentId: 'VD', quantity: 1, price: 1500, report: 'Informe_balance_car.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'BR2', code: 'BR-2', name: 'BRAKE DISCS', departmentId: 'VD', quantity: 1, price: 1200, report: 'Informe_brake_discs.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'BR3', code: 'BR-3', name: 'BRAKE FLUID', departmentId: 'VD', quantity: 1, price: 300, report: 'Informe_brake_fluid.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'BR4', code: 'BR-4', name: 'BRAKE LINES', departmentId: 'VD', quantity: 1, price: 800, report: 'Informe_brake_lines.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'BR5', code: 'BR-5', name: 'BRAKE MASTER CYLINDER', departmentId: 'VD', quantity: 1, price: 1000, report: 'Informe_brake_master.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'BR6', code: 'BR-6', name: 'BRAKE PADS', departmentId: 'VD', quantity: 1, price: 600, report: 'Informe_brake_pads.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'BR7', code: 'BR-7', name: 'BRAKE SYSTEM FRONT', departmentId: 'VD', quantity: 1, price: 2000, report: 'Informe_brake_front.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'BR8', code: 'BR-8', name: 'BRAKE SYSTEM REAR', departmentId: 'VD', quantity: 1, price: 2000, report: 'Informe_brake_rear.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'BR9', code: 'BR-9', name: 'CALIPERS', departmentId: 'VD', quantity: 1, price: 900, report: 'Informe_calipers.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'BR10', code: 'BR-10', name: 'FASTENERS', departmentId: 'VD', quantity: 1, price: 400, report: 'Informe_fasteners.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'BR11', code: 'BR-11', name: 'PROPORTIONING VALVE', departmentId: 'VD', quantity: 1, price: 700, report: 'Informe_proportioning.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'BR12', code: 'BR-12', name: 'OTHER', departmentId: 'VD', quantity: 1, price: 500, report: 'Informe_brakes_other.pdf', departmentName: 'Vehicle Dynamics' },

    // STEERING - Vehicle Dynamics (VD)
    { id: 'ST1', code: 'ST-1', name: 'STEERING RACK', departmentId: 'VD', quantity: 1, price: 1200, report: 'Informe_steering_rack.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'ST2', code: 'ST-2', name: 'STEERING SHAFT', departmentId: 'VD', quantity: 1, price: 800, report: 'Informe_steering_shaft.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'ST3', code: 'ST-3', name: 'STEERING WHEEL', departmentId: 'VD', quantity: 1, price: 1000, report: 'Informe_steering_wheel.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'ST4', code: 'ST-4', name: 'STEERING WHEEL QUICK RELEASE', departmentId: 'VD', quantity: 1, price: 600, report: 'Informe_steering_quick.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'ST5', code: 'ST-5', name: 'TIE RODS', departmentId: 'VD', quantity: 1, price: 700, report: 'Informe_tie_rods.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'ST6', code: 'ST-6', name: 'OTHER', departmentId: 'VD', quantity: 1, price: 500, report: 'Informe_steering_other.pdf', departmentName: 'Vehicle Dynamics' },

    // SUSPENSION - Vehicle Dynamics (VD)
    { id: 'SU1', code: 'SU-1', name: 'A-ARMS FRONT LOWER', departmentId: 'VD', quantity: 1, price: 1500, report: 'Informe_aarms_front_lower.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU2', code: 'SU-2', name: 'A-ARMS FRONT UPPER', departmentId: 'VD', quantity: 1, price: 1500, report: 'Informe_aarms_front_upper.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU3', code: 'SU-3', name: 'A-ARMS REAR LOWER', departmentId: 'VD', quantity: 1, price: 1500, report: 'Informe_aarms_rear_lower.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU4', code: 'SU-4', name: 'A-ARMS REAR UPPER', departmentId: 'VD', quantity: 1, price: 1500, report: 'Informe_aarms_rear_upper.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU5', code: 'SU-5', name: 'ANTI ROLL BAR FRONT', departmentId: 'VD', quantity: 1, price: 1200, report: 'Informe_antiroll_front.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU6', code: 'SU-6', name: 'ANTI ROLL BAR REAR', departmentId: 'VD', quantity: 1, price: 1200, report: 'Informe_antiroll_rear.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU7', code: 'SU-7', name: 'BELL CRANKS', departmentId: 'VD', quantity: 1, price: 900, report: 'Informe_bell_cranks.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU8', code: 'SU-8', name: 'BELL CRANKS FRONT', departmentId: 'VD', quantity: 1, price: 900, report: 'Informe_bell_front.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU9', code: 'SU-9', name: 'BELL CRANKS REAR', departmentId: 'VD', quantity: 1, price: 900, report: 'Informe_bell_rear.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU10', code: 'SU-10', name: 'BRACKERS', departmentId: 'VD', quantity: 1, price: 700, report: 'Informe_brackers.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU11', code: 'SU-11', name: 'DAMPER SYSTEM FRONT', departmentId: 'VD', quantity: 1, price: 2000, report: 'Informe_damper_front.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU12', code: 'SU-12', name: 'DAMPER SYSTEM REAR', departmentId: 'VD', quantity: 1, price: 2000, report: 'Informe_damper_rear.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU13', code: 'SU-13', name: 'FRONT A/ARMS OR EQUIVALENT', departmentId: 'VD', quantity: 1, price: 1400, report: 'Informe_front_aarms.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU14', code: 'SU-14', name: 'FRONT UPRIGHTS', departmentId: 'VD', quantity: 1, price: 1300, report: 'Informe_front_uprights.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU15', code: 'SU-15', name: 'PUSH/PULLROD FRONT', departmentId: 'VD', quantity: 1, price: 1100, report: 'Informe_pushpull_front.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU16', code: 'SU-16', name: 'PUSH/PULLROD REAR', departmentId: 'VD', quantity: 1, price: 1100, report: 'Informe_pushpull_rear.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU17', code: 'SU-17', name: 'PUSHRODS/PULLRODS', departmentId: 'VD', quantity: 1, price: 1000, report: 'Informe_pushpullrods.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU18', code: 'SU-18', name: 'REAR A/ARMS OR EQUIVALENT', departmentId: 'VD', quantity: 1, price: 1400, report: 'Informe_rear_aarms.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU19', code: 'SU-19', name: 'REAR UPRIGHTS', departmentId: 'VD', quantity: 1, price: 1300, report: 'Informe_rear_uprights.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU20', code: 'SU-20', name: 'ROD ENDS', departmentId: 'VD', quantity: 1, price: 600, report: 'Informe_rod_ends.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU21', code: 'SU-21', name: 'SHOCKS FRONT', departmentId: 'VD', quantity: 1, price: 1800, report: 'Informe_shocks_front.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU22', code: 'SU-22', name: 'SHOCKS REAR', departmentId: 'VD', quantity: 1, price: 1800, report: 'Informe_shocks_rear.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU23', code: 'SU-23', name: 'SPRINGS', departmentId: 'VD', quantity: 1, price: 900, report: 'Informe_springs.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU24', code: 'SU-24', name: 'SUSPENSION MECHANISM', departmentId: 'VD', quantity: 1, price: 2500, report: 'Informe_suspension_mechanism.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU25', code: 'SU-25', name: 'TIE ROD - FRONT', departmentId: 'VD', quantity: 1, price: 800, report: 'Informe_tie_front.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU26', code: 'SU-26', name: 'TIE ROD - REAR', departmentId: 'VD', quantity: 1, price: 800, report: 'Informe_tie_rear.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'SU27', code: 'SU-27', name: 'OTHER', departmentId: 'VD', quantity: 1, price: 500, report: 'Informe_suspension_other.pdf', departmentName: 'Vehicle Dynamics' },

    // WHEELS, WHEEL BEARINGS & TIRES - Vehicle Dynamics (VD)
    { id: 'WT1', code: 'WT-1', name: 'FRONT HUBS', departmentId: 'VD', quantity: 1, price: 1100, report: 'Informe_front_hubs.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'WT2', code: 'WT-2', name: 'LUG NUTS', departmentId: 'VD', quantity: 1, price: 300, report: 'Informe_lug_nuts.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'WT3', code: 'WT-3', name: 'REAR HUBS', departmentId: 'VD', quantity: 1, price: 1100, report: 'Informe_rear_hubs.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'WT4', code: 'WT-4', name: 'TIRES', departmentId: 'VD', quantity: 1, price: 2000, report: 'Informe_tires.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'WT5', code: 'WT-5', name: 'VALVE STEMS', departmentId: 'VD', quantity: 1, price: 200, report: 'Informe_valve_stems.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'WT6', code: 'WT-6', name: 'WHEEL BEARINGS', departmentId: 'VD', quantity: 1, price: 800, report: 'Informe_wheel_bearings.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'WT7', code: 'WT-7', name: 'WHEEL STUDS', departmentId: 'VD', quantity: 1, price: 400, report: 'Informe_wheel_studs.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'WT8', code: 'WT-8', name: 'WHEEL WEIGHTS', departmentId: 'VD', quantity: 1, price: 300, report: 'Informe_wheel_weights.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'WT9', code: 'WT-9', name: 'WHEELS', departmentId: 'VD', quantity: 1, price: 1800, report: 'Informe_wheels.pdf', departmentName: 'Vehicle Dynamics' },
    { id: 'WT10', code: 'WT-10', name: 'OTHER', departmentId: 'VD', quantity: 1, price: 500, report: 'Informe_wheels_other.pdf', departmentName: 'Vehicle Dynamics' },

    // ENGINE & DRIVETRAIN - Engine (EN)
    { id: 'EN1', code: 'EN-1', name: 'AIR FILTER', departmentId: 'EN', quantity: 1, price: 400, report: 'Informe_air_filter.pdf', departmentName: 'Engine' },
    { id: 'EN2', code: 'EN-2', name: 'AIRBOX', departmentId: 'EN', quantity: 1, price: 900, report: 'Informe_airbox.pdf', departmentName: 'Engine' },
    { id: 'EN3', code: 'EN-3', name: 'AXLES', departmentId: 'EN', quantity: 1, price: 1500, report: 'Informe_axles.pdf', departmentName: 'Engine' },
    { id: 'EN4', code: 'EN-4', name: 'CV JOINTS/U JOINTS', departmentId: 'EN', quantity: 1, price: 1000, report: 'Informe_cv_joints.pdf', departmentName: 'Engine' },
    { id: 'EN5', code: 'EN-5', name: 'CARBURETOR', departmentId: 'EN', quantity: 1, price: 800, report: 'Informe_carburetor.pdf', departmentName: 'Engine' },
    { id: 'EN6', code: 'EN-6', name: 'CHAIN / BELT', departmentId: 'EN', quantity: 1, price: 700, report: 'Informe_chain_belt.pdf', departmentName: 'Engine' },
    { id: 'EN7', code: 'EN-7', name: 'CLUTCH', departmentId: 'EN', quantity: 1, price: 1200, report: 'Informe_clutch.pdf', departmentName: 'Engine' },
    { id: 'EN8', code: 'EN-8', name: 'COOLANT', departmentId: 'EN', quantity: 1, price: 300, report: 'Informe_coolant.pdf', departmentName: 'Engine' },
    { id: 'EN9', code: 'EN-9', name: 'COOLANT LINES', departmentId: 'EN', quantity: 1, price: 600, report: 'Informe_coolant_lines.pdf', departmentName: 'Engine' },
    { id: 'EN10', code: 'EN-10', name: 'COOLING SYSTEM', departmentId: 'EN', quantity: 1, price: 2000, report: 'Informe_cooling_system.pdf', departmentName: 'Engine' },
    { id: 'EN11', code: 'EN-11', name: 'DIFFERENTIAL', departmentId: 'EN', quantity: 1, price: 1800, report: 'Informe_differential.pdf', departmentName: 'Engine' },
    { id: 'EN12', code: 'EN-12', name: 'DIFFERENTIAL BEARINGS', departmentId: 'EN', quantity: 1, price: 900, report: 'Informe_differential_bearings.pdf', departmentName: 'Engine' },
    { id: 'EN13', code: 'EN-13', name: 'DIFFERENTIAL MOUNTS', departmentId: 'EN', quantity: 1, price: 700, report: 'Informe_differential_mounts.pdf', departmentName: 'Engine' },
    { id: 'EN14', code: 'EN-14', name: 'DRIVESHAFT ASSEMBLY', departmentId: 'EN', quantity: 1, price: 1600, report: 'Informe_driveshaft.pdf', departmentName: 'Engine' },
    { id: 'EN15', code: 'EN-15', name: 'DRIVETRAIN ASSEMBLY', departmentId: 'EN', quantity: 1, price: 2500, report: 'Informe_drivetrain.pdf', departmentName: 'Engine' },
    { id: 'EN16', code: 'EN-16', name: 'ENGINE', departmentId: 'EN', quantity: 1, price: 5000, report: 'Informe_engine.pdf', departmentName: 'Engine' },
    { id: 'EN17', code: 'EN-17', name: 'ENGINE MOUNTS', departmentId: 'EN', quantity: 1, price: 800, report: 'Informe_engine_mounts.pdf', departmentName: 'Engine' },
    { id: 'EN18', code: 'EN-18', name: 'ENGINE/DIFF OIL', departmentId: 'EN', quantity: 1, price: 400, report: 'Informe_engine_oil.pdf', departmentName: 'Engine' },
    { id: 'EN19', code: 'EN-19', name: 'EXHAUST MANIFOLD', departmentId: 'EN', quantity: 1, price: 1100, report: 'Informe_exhaust_manifold.pdf', departmentName: 'Engine' },
    { id: 'EN20', code: 'EN-20', name: 'EXHAUST SYSTEM', departmentId: 'EN', quantity: 1, price: 1800, report: 'Informe_exhaust_system.pdf', departmentName: 'Engine' },
    { id: 'EN21', code: 'EN-21', name: 'FUEL FILTER', departmentId: 'EN', quantity: 1, price: 500, report: 'Informe_fuel_filter.pdf', departmentName: 'Engine' },
    { id: 'EN22', code: 'EN-22', name: 'FUEL INJECTORS', departmentId: 'EN', quantity: 1, price: 900, report: 'Informe_fuel_injectors.pdf', departmentName: 'Engine' },
    { id: 'EN23', code: 'EN-23', name: 'FUEL LINES/RAILS', departmentId: 'EN', quantity: 1, price: 700, report: 'Informe_fuel_lines.pdf', departmentName: 'Engine' },
    { id: 'EN24', code: 'EN-24', name: 'FUEL PRESSURE REG.', departmentId: 'EN', quantity: 1, price: 600, report: 'Informe_fuel_pressure.pdf', departmentName: 'Engine' },
    { id: 'EN25', code: 'EN-25', name: 'FUEL PUMP', departmentId: 'EN', quantity: 1, price: 1000, report: 'Informe_fuel_pump.pdf', departmentName: 'Engine' },
    { id: 'EN26', code: 'EN-26', name: 'FUEL TANK - NOT THE HV-BATTERY', departmentId: 'EN', quantity: 1, price: 1500, report: 'Informe_fuel_tank.pdf', departmentName: 'Engine' },
    { id: 'EN27', code: 'EN-27', name: 'FUEL VENT/CHECK VALVE', departmentId: 'EN', quantity: 1, price: 400, report: 'Informe_fuel_vent.pdf', departmentName: 'Engine' },
    { id: 'EN28', code: 'EN-28', name: 'GEARBOX', departmentId: 'EN', quantity: 1, price: 2000, report: 'Informe_gearbox.pdf', departmentName: 'Engine' },
    { id: 'EN29', code: 'EN-29', name: 'HOSE CLAMPS', departmentId: 'EN', quantity: 1, price: 300, report: 'Informe_hose_clamps.pdf', departmentName: 'Engine' },
    { id: 'EN30', code: 'EN-30', name: 'INTAKE MANIFOLD', departmentId: 'EN', quantity: 1, price: 1100, report: 'Informe_intake_manifold.pdf', departmentName: 'Engine' },
    { id: 'EN31', code: 'EN-31', name: 'INTAKE SYSTEM', departmentId: 'EN', quantity: 1, price: 1300, report: 'Informe_intake_system.pdf', departmentName: 'Engine' },
    { id: 'EN32', code: 'EN-32', name: 'MUFFLER', departmentId: 'EN', quantity: 1, price: 900, report: 'Informe_muffler.pdf', departmentName: 'Engine' },
    { id: 'EN33', code: 'EN-33', name: 'OIL COOLER', departmentId: 'EN', quantity: 1, price: 1000, report: 'Informe_oil_cooler.pdf', departmentName: 'Engine' },
    { id: 'EN34', code: 'EN-34', name: 'OVERFLOW BOTTLES', departmentId: 'EN', quantity: 1, price: 500, report: 'Informe_overflow_bottles.pdf', departmentName: 'Engine' },
    { id: 'EN35', code: 'EN-35', name: 'RADIATOR', departmentId: 'EN', quantity: 1, price: 1500, report: 'Informe_radiator.pdf', departmentName: 'Engine' },
    { id: 'EN36', code: 'EN-36', name: 'RADIATOR FANS', departmentId: 'EN', quantity: 1, price: 800, report: 'Informe_radiator_fans.pdf', departmentName: 'Engine' },
    { id: 'EN37', code: 'EN-37', name: 'RESTRICTOR', departmentId: 'EN', quantity: 1, price: 600, report: 'Informe_restrictor.pdf', departmentName: 'Engine' },
    { id: 'EN38', code: 'EN-38', name: 'SHIELDS', departmentId: 'EN', quantity: 1, price: 700, report: 'Informe_shields.pdf', departmentName: 'Engine' },
    { id: 'EN39', code: 'EN-39', name: 'SPROCKET/PULLEYS', departmentId: 'EN', quantity: 1, price: 900, report: 'Informe_sprocket_pulleys.pdf', departmentName: 'Engine' },
    { id: 'EN40', code: 'EN-40', name: 'THROTTLE BODY', departmentId: 'EN', quantity: 1, price: 1000, report: 'Informe_throttle_body.pdf', departmentName: 'Engine' },
    { id: 'EN41', code: 'EN-41', name: 'TRANSMISSION', departmentId: 'EN', quantity: 1, price: 2200, report: 'Informe_transmission.pdf', departmentName: 'Engine' },
    { id: 'EN42', code: 'EN-42', name: 'TURBO/SUPER CHARGER', departmentId: 'EN', quantity: 1, price: 3000, report: 'Informe_turbo.pdf', departmentName: 'Engine' },
    { id: 'EN43', code: 'EN-43', name: 'OTHER', departmentId: 'EN', quantity: 1, price: 500, report: 'Informe_engine_other.pdf', departmentName: 'Engine' },

    // ELECTRICAL - Engine (EN)
    { id: 'EL1', code: 'EL-1', name: 'ACCUMULATOR', departmentId: 'EN', quantity: 1, price: 1200, report: 'Informe_accumulator.pdf', departmentName: 'Engine' },
    { id: 'EL2', code: 'EL-2', name: 'ACCUMULATOR CONTAINER', departmentId: 'EN', quantity: 1, price: 900, report: 'Informe_accumulator_container.pdf', departmentName: 'Engine' },
    { id: 'EL3', code: 'EL-3', name: 'ACCUMULATOR COOLING', departmentId: 'EN', quantity: 1, price: 800, report: 'Informe_accumulator_cooling.pdf', departmentName: 'Engine' },
    { id: 'EL4', code: 'EL-4', name: 'AUTONOMOUS ACCELERATION SYSTEM', departmentId: 'EN', quantity: 1, price: 2500, report: 'Informe_autonomous_accel.pdf', departmentName: 'Engine' },
    { id: 'EL5', code: 'EL-5', name: 'AUTONOMOUS BOX', departmentId: 'EN', quantity: 1, price: 2000, report: 'Informe_autonomous_box.pdf', departmentName: 'Engine' },
    { id: 'EL6', code: 'EL-6', name: 'AUTONOMOUS BRAKE SYSTEM', departmentId: 'EN', quantity: 1, price: 2200, report: 'Informe_autonomous_brake.pdf', departmentName: 'Engine' },
    { id: 'EL7', code: 'EL-7', name: 'AUTONOMOUS CAMERA SYSTEM', departmentId: 'EN', quantity: 1, price: 3000, report: 'Informe_autonomous_camera.pdf', departmentName: 'Engine' },
    { id: 'EL8', code: 'EL-8', name: 'AUTONOMOUS EBS', departmentId: 'EN', quantity: 1, price: 1800, report: 'Informe_autonomous_ebs.pdf', departmentName: 'Engine' },
    { id: 'EL9', code: 'EL-9', name: 'AUTONOMOUS LIDAR SYSTEM', departmentId: 'EN', quantity: 1, price: 3500, report: 'Informe_autonomous_lidar.pdf', departmentName: 'Engine' },
    { id: 'EL10', code: 'EL-10', name: 'AUTONOMOUS RADAR SYSTEM', departmentId: 'EN', quantity: 1, price: 3200, report: 'Informe_autonomous_radar.pdf', departmentName: 'Engine' },
    { id: 'EL11', code: 'EL-11', name: 'AUTONOMOUS STEERING SYSTEM', departmentId: 'EN', quantity: 1, price: 2800, report: 'Informe_autonomous_steering.pdf', departmentName: 'Engine' },
    { id: 'EL12', code: 'EL-12', name: 'AUTONOMOUS SYSTEM', departmentId: 'EN', quantity: 1, price: 4000, report: 'Informe_autonomous_system.pdf', departmentName: 'Engine' },
    { id: 'EL13', code: 'EL-13', name: 'BSPD', departmentId: 'EN', quantity: 1, price: 1000, report: 'Informe_bspd.pdf', departmentName: 'Engine' },
    { id: 'EL14', code: 'EL-14', name: 'BRAKE LIGHT', departmentId: 'EN', quantity: 1, price: 300, report: 'Informe_brake_light.pdf', departmentName: 'Engine' },
    { id: 'EL15', code: 'EL-15', name: 'BULBS', departmentId: 'EN', quantity: 1, price: 200, report: 'Informe_bulbs.pdf', departmentName: 'Engine' },
    { id: 'EL16', code: 'EL-16', name: 'CONTROL UNIT', departmentId: 'EN', quantity: 1, price: 1500, report: 'Informe_control_unit.pdf', departmentName: 'Engine' },
    { id: 'EL17', code: 'EL-17', name: 'DASH PANEL', departmentId: 'EN', quantity: 1, price: 800, report: 'Informe_dash_panel.pdf', departmentName: 'Engine' },
    { id: 'EL18', code: 'EL-18', name: 'ECM/ENGINE ELECTRONICS', departmentId: 'EN', quantity: 1, price: 2000, report: 'Informe_engine_electronics.pdf', departmentName: 'Engine' },
    { id: 'EL19', code: 'EL-19', name: 'FUSES', departmentId: 'EN', quantity: 1, price: 150, report: 'Informe_fuses.pdf', departmentName: 'Engine' },
    { id: 'EL20', code: 'EL-20', name: 'HV-BATTERY', departmentId: 'EN', quantity: 1, price: 5000, report: 'Informe_hv_battery.pdf', departmentName: 'Engine' },
    { id: 'EL21', code: 'EL-21', name: 'INDICATOR LIGHTS', departmentId: 'EN', quantity: 1, price: 400, report: 'Informe_indicator_lights.pdf', departmentName: 'Engine' },
    { id: 'EL22', code: 'EL-22', name: 'KILL SWITCH', departmentId: 'EN', quantity: 1, price: 600, report: 'Informe_kill_switch.pdf', departmentName: 'Engine' },
    { id: 'EL23', code: 'EL-23', name: 'LV-BATTERY', departmentId: 'EN', quantity: 1, price: 800, report: 'Informe_lv_battery.pdf', departmentName: 'Engine' },
    { id: 'EL24', code: 'EL-24', name: 'OILS PRESSURE GAGE/LIGHT', departmentId: 'EN', quantity: 1, price: 500, report: 'Informe_oil_pressure.pdf', departmentName: 'Engine' },
    { id: 'EL25', code: 'EL-25', name: 'RELAYS', departmentId: 'EN', quantity: 1, price: 300, report: 'Informe_relays.pdf', departmentName: 'Engine' },
    { id: 'EL26', code: 'EL-26', name: 'SENSORS', departmentId: 'EN', quantity: 1, price: 1200, report: 'Informe_sensors.pdf', departmentName: 'Engine' },
    { id: 'EL27', code: 'EL-27', name: 'SOLENOIDS', departmentId: 'EN', quantity: 1, price: 700, report: 'Informe_solenoids.pdf', departmentName: 'Engine' },
    { id: 'EL28', code: 'EL-28', name: 'STARTER BUTTON', departmentId: 'EN', quantity: 1, price: 400, report: 'Informe_starter_button.pdf', departmentName: 'Engine' },
    { id: 'EL29', code: 'EL-29', name: 'TSAL/ASSI', departmentId: 'EN', quantity: 1, price: 900, report: 'Informe_tsal_assi.pdf', departmentName: 'Engine' },
    { id: 'EL30', code: 'EL-30', name: 'TACHOMETER', departmentId: 'EN', quantity: 1, price: 800, report: 'Informe_tachometer.pdf', departmentName: 'Engine' },
    { id: 'EL31', code: 'EL-31', name: 'TELEMETRY', departmentId: 'EN', quantity: 1, price: 2000, report: 'Informe_telemetry.pdf', departmentName: 'Engine' },
    { id: 'EL32', code: 'EL-32', name: 'VCU', departmentId: 'EN', quantity: 1, price: 1500, report: 'Informe_vcu.pdf', departmentName: 'Engine' },
    { id: 'EL33', code: 'EL-33', name: 'WATER TEMPERATURE GAGE', departmentId: 'EN', quantity: 1, price: 500, report: 'Informe_water_temp.pdf', departmentName: 'Engine' },
    { id: 'EL34', code: 'EL-34', name: 'WIRE HARNESS/CONNECTORS', departmentId: 'EN', quantity: 1, price: 1000, report: 'Informe_wire_harness.pdf', departmentName: 'Engine' },
    { id: 'EL35', code: 'EL-35', name: 'OTHER', departmentId: 'EN', quantity: 1, price: 500, report: 'Informe_electrical_other.pdf', departmentName: 'Engine' },

    // CHASSIS & BODY - Chassis (CH) / Aero (AE)
    { id: 'FR1', code: 'FR-1', name: 'AERODYNAMIC WING (IF USED)', departmentId: 'AE', quantity: 1, price: 3000, report: 'Informe_aero_wing.pdf', departmentName: 'Aero' },
    { id: 'FR2', code: 'FR-2', name: 'AERODYNAMICS DRS', departmentId: 'AE', quantity: 1, price: 2500, report: 'Informe_aero_drs.pdf', departmentName: 'Aero' },
    { id: 'FR3', code: 'FR-3', name: 'AERODYNAMICS FRONT WING', departmentId: 'AE', quantity: 1, price: 2800, report: 'Informe_aero_front_wing.pdf', departmentName: 'Aero' },
    { id: 'FR4', code: 'FR-4', name: 'AERODYNAMICS REAR WING', departmentId: 'AE', quantity: 1, price: 2800, report: 'Informe_aero_rear_wing.pdf', departmentName: 'Aero' },
    { id: 'FR5', code: 'FR-5', name: 'AERODYNAMICS SIDE WING', departmentId: 'AE', quantity: 1, price: 2200, report: 'Informe_aero_side_wing.pdf', departmentName: 'Aero' },
    { id: 'FR6', code: 'FR-6', name: 'AERODYNAMICS UNDERBODY', departmentId: 'AE', quantity: 1, price: 3000, report: 'Informe_aero_underbody.pdf', departmentName: 'Aero' },
    { id: 'FR7', code: 'FR-7', name: 'AUTONOMOUS EBS', departmentId: 'AE', quantity: 1, price: 2000, report: 'Informe_autonomous_ebs.pdf', departmentName: 'Aero' },
    { id: 'FR8', code: 'FR-8', name: 'BODY ATTACHMENTS', departmentId: 'CH', quantity: 1, price: 900, report: 'Informe_body_attachments.pdf', departmentName: 'Chassis' },
    { id: 'FR9', code: 'FR-9', name: 'BODY MATERIAL', departmentId: 'CH', quantity: 1, price: 1500, report: 'Informe_body_material.pdf', departmentName: 'Chassis' },
    { id: 'FR10', code: 'FR-10', name: 'BODY PROCESSING', departmentId: 'CH', quantity: 1, price: 1200, report: 'Informe_body_processing.pdf', departmentName: 'Chassis' },
    { id: 'FR11', code: 'FR-11', name: 'BRACKETS', departmentId: 'CH', quantity: 1, price: 600, report: 'Informe_brackets.pdf', departmentName: 'Chassis' },
    { id: 'FR12', code: 'FR-12', name: 'CHASSIS ASSEMBLY', departmentId: 'CH', quantity: 1, price: 5000, report: 'Informe_chassis_assembly.pdf', departmentName: 'Chassis' },
    { id: 'FR13', code: 'FR-13', name: 'CLUTCH', departmentId: 'CH', quantity: 1, price: 1200, report: 'Informe_clutch_chassis.pdf', departmentName: 'Chassis' },
    { id: 'FR14', code: 'FR-14', name: 'CRASH BOX', departmentId: 'CH', quantity: 1, price: 1800, report: 'Informe_crash_box.pdf', departmentName: 'Chassis' },
    { id: 'FR15', code: 'FR-15', name: 'FLOOR PAN', departmentId: 'CH', quantity: 1, price: 1000, report: 'Informe_floor_pan.pdf', departmentName: 'Chassis' },
    { id: 'FR16', code: 'FR-16', name: 'FRAME/FRAME TUBES', departmentId: 'CH', quantity: 1, price: 3000, report: 'Informe_frame_tubes.pdf', departmentName: 'Chassis' },
    { id: 'FR17', code: 'FR-17', name: 'FRONT HOOP', departmentId: 'CH', quantity: 1, price: 1400, report: 'Informe_front_hoop.pdf', departmentName: 'Chassis' },
    { id: 'FR18', code: 'FR-18', name: 'FRONT PART FRAME', departmentId: 'CH', quantity: 1, price: 2000, report: 'Informe_front_frame.pdf', departmentName: 'Chassis' },
    { id: 'FR19', code: 'FR-19', name: 'IMPACT ATTENUATOR', departmentId: 'CH', quantity: 1, price: 1600, report: 'Informe_impact_attenuator.pdf', departmentName: 'Chassis' },
    { id: 'FR20', code: 'FR-20', name: 'MAIN HOOP', departmentId: 'CH', quantity: 1, price: 1500, report: 'Informe_main_hoop.pdf', departmentName: 'Chassis' },
    { id: 'FR21', code: 'FR-21', name: 'MONOCOQUE', departmentId: 'CH', quantity: 1, price: 4500, report: 'Informe_monocoque.pdf', departmentName: 'Chassis' },
    { id: 'FR22', code: 'FR-22', name: 'MOUNTS INTEGRAL TO FRAME', departmentId: 'CH', quantity: 1, price: 800, report: 'Informe_mounts_frame.pdf', departmentName: 'Chassis' },
    { id: 'FR23', code: 'FR-23', name: 'PEDAL (ACCELERATOR)', departmentId: 'CH', quantity: 1, price: 700, report: 'Informe_pedal_accelerator.pdf', departmentName: 'Chassis' },
    { id: 'FR24', code: 'FR-24', name: 'PEDAL (BRAKE)', departmentId: 'CH', quantity: 1, price: 700, report: 'Informe_pedal_brake.pdf', departmentName: 'Chassis' },
    { id: 'FR25', code: 'FR-25', name: 'PEDALS', departmentId: 'CH', quantity: 1, price: 600, report: 'Informe_pedals.pdf', departmentName: 'Chassis' },
    { id: 'FR26', code: 'FR-26', name: 'REAR FRAME', departmentId: 'CH', quantity: 1, price: 1800, report: 'Informe_rear_frame.pdf', departmentName: 'Chassis' },
    { id: 'FR27', code: 'FR-27', name: 'SHIFTER', departmentId: 'CH', quantity: 1, price: 900, report: 'Informe_shifter.pdf', departmentName: 'Chassis' },
    { id: 'FR28', code: 'FR-28', name: 'SHIFTER CABLE/LINKAGE', departmentId: 'CH', quantity: 1, price: 700, report: 'Informe_shifter_cable.pdf', departmentName: 'Chassis' },
    { id: 'FR29', code: 'FR-29', name: 'THROTTLE CONTROLS', departmentId: 'CH', quantity: 1, price: 800, report: 'Informe_throttle_controls.pdf', departmentName: 'Chassis' },
    { id: 'FR30', code: 'FR-30', name: 'TUBE END PREPS', departmentId: 'CH', quantity: 1, price: 500, report: 'Informe_tube_end.pdf', departmentName: 'Chassis' },
    { id: 'FR31', code: 'FR-31', name: 'TUBE CUTS/BENDS', departmentId: 'CH', quantity: 1, price: 600, report: 'Informe_tube_cuts.pdf', departmentName: 'Chassis' },
    { id: 'FR32', code: 'FR-32', name: 'OTHER', departmentId: 'CH', quantity: 1, price: 500, report: 'Informe_chassis_other.pdf', departmentName: 'Chassis' },

    // MISC., FIT & FINISH & ASSEMBLY - Chassis (CH)
    { id: 'MS1', code: 'MS-1', name: "DRIVER'S HARNESS", departmentId: 'CH', quantity: 1, price: 900, report: 'Informe_driver_harness.pdf', departmentName: 'Chassis' },
    { id: 'MS2', code: 'MS-2', name: 'FIRE WALL', departmentId: 'CH', quantity: 1, price: 1200, report: 'Informe_fire_wall.pdf', departmentName: 'Chassis' },
    { id: 'MS3', code: 'MS-3', name: 'HEADREST/RESTRAINTS', departmentId: 'CH', quantity: 1, price: 700, report: 'Informe_headrest.pdf', departmentName: 'Chassis' },
    { id: 'MS4', code: 'MS-4', name: 'MIRRORS', departmentId: 'CH', quantity: 1, price: 500, report: 'Informe_mirrors.pdf', departmentName: 'Chassis' },
    { id: 'MS5', code: 'MS-5', name: 'PAINT - BODY', departmentId: 'CH', quantity: 1, price: 800, report: 'Informe_paint_body.pdf', departmentName: 'Chassis' },
    { id: 'MS6', code: 'MS-6', name: 'PAINT - FRAME', departmentId: 'CH', quantity: 1, price: 800, report: 'Informe_paint_frame.pdf', departmentName: 'Chassis' },
    { id: 'MS7', code: 'MS-7', name: 'SEATS', departmentId: 'CH', quantity: 1, price: 1200, report: 'Informe_seats.pdf', departmentName: 'Chassis' },
    { id: 'MS8', code: 'MS-8', name: 'SHIELDS', departmentId: 'CH', quantity: 1, price: 600, report: 'Informe_shields_chassis.pdf', departmentName: 'Chassis' },
    { id: 'MS9', code: 'MS-9', name: 'OTHERS', departmentId: 'CH', quantity: 1, price: 500, report: 'Informe_misc_other.pdf', departmentName: 'Chassis' },
  ],
  filteredPieces: [],
  fetchPieces: () => set((state) => ({ pieces: state.pieces, filteredPieces: state.pieces })),
  setFilter: (term) => set((state) => ({
    filteredPieces: typeof term === 'string'
      ? state.pieces.filter(piece =>
          piece.code.toLowerCase().includes(term.toLowerCase()) ||
          piece.name.toLowerCase().includes(term.toLowerCase()) ||
          (piece.departmentName || '').toLowerCase().includes(term.toLowerCase())
        )
      : state.pieces.filter(piece => term.code && piece.code === term.code),
  })),
  setDepartmentFilter: (departmentId: string) => set((state) => ({
    filteredPieces: departmentId ? state.pieces.filter(piece => piece.departmentId === departmentId) : state.pieces,
  })),
}));