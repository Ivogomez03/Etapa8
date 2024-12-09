/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package isi.deso.DTO;

/**
 *
 * @author ivogo
 */

import isi.deso.model.ItemMenu;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class VendedorDTO {
    private String nombre;
    private String apellido;
    private String direccion;
    private String dni;
    private double longitud;
    private double latitud;
    private List<ItemMenu> items;
}