"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HallModule = void 0;
var common_1 = require("@nestjs/common");
var hall_controller_1 = require("./hall.controller");
var hall_service_1 = require("./hall.service");
var mongoose_1 = require("@nestjs/mongoose");
var hall_schema_1 = require("../concert_hall/schemas/hall.schema");
var HallModule = /** @class */ (function () {
    function HallModule() {
    }
    HallModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: 'hall', schema: hall_schema_1.HallSchema }])
            ],
            controllers: [hall_controller_1.HallController],
            providers: [hall_service_1.HallService]
        })
    ], HallModule);
    return HallModule;
}());
exports.HallModule = HallModule;
