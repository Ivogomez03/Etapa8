/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package isi.deso.DTO;

import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author ivogo
 */
@Getter
@Setter
public class ClienteDTO {

    private String email;
    private String cuit;
    private String direccion;
    private double longitud;
    private double latitud;

    public ClienteDTO() {
    };

}