function main(args)
*======================================================================================
* Script created by: Bryan Burlingame - (2013-2014)
***************************************************************************************

latmin=subwrd(args,1)
latmax=subwrd(args,2)
lonmin=subwrd(args,3)
lonmax=subwrd(args,4)
model=subwrd(args,5)

'reinit'
'set display color white'
'open /tornado/r1/bmburlin/NCEP/RAP/RAP.ctl'
'set vpage 0 11.0 0 8.5'
'set parea 0.1 10.1 .3 7.9'
'set mpdraw on'
'set mpdset hires'
'set mpt 0 1 1 1'
'set mpt 1 1 1 1'
'set mpt 2 1 1 1'
'set xlab off'
'set ylab off'
'set grid off'
'set mproj scaled'
'set lat 'latmin ' 'latmax
'set lon 'lonmin ' 'lonmax

count = 0
t = 1
fhr = 0
inc = 1
'q file'
rec=sublin(result,5)
numbfor=subwrd(rec,12)

'set t 1'
'q time'
init = subwrd(result,3)
inittime = substr(init,1,12)
initday = substr(init,4,2)
inithr = substr(init,1,3)
initmonth = substr(init,6,3)
inityr = substr(init,9,12)

'run colors/colors_RH.gs'

while (count < numbfor)
  'set t 't

*===For the "VALID" forecast hour====*
  'q time'
  res = subwrd(result,3)
  Z_temp = substr(res,3,1)

  if (Z_temp = Z )
    vtime = substr(res,1,12)
    vhr = substr(vtime,1,2)
    vmonth = substr(vtime,6,3)
    vday = substr(vtime,4,2)
    vyr = substr(vtime,9,12)
    vmin = 00
  else
    vtime = substr(res,1,15)
    vhr = substr(vtime,1,2)
    vmonth = substr(vtime,9,3)
    vday = substr(vtime,7,2)
    vyr = substr(vtime,12,12)
    vmin = substr(vtime,4,2)
  endif
*************************************

  'set grads off'
  'set clevs 5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100'
  'set ccols 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40'
  'set gxout shaded'
  'd rhprs'

  if (model = "glRAP")
    'set rgb 255 128 128 128 100'
    'set line 255 1 0.001'
    'draw shp /tornado/r1/bmburlin/NCEP/misc/shapefiles/counties/dtl_cnty.shp'
  endif
    'set rgb 254   0   3 229 100'
    'set line 254 1 0.01'
    'draw shp /tornado/r1/bmburlin/NCEP/misc/shapefiles/highways/in101503.shp'
    'set line 1 1 1'
    'draw shp /tornado/r1/bmburlin/NCEP/misc/shapefiles/states/dtl_st.shp'

  'set gxout contour'
  'set ccolor 1'
  'set cthick 4'
  if (model = "glRAP")
    'set cint 2'
  else
    'set cint 4'
  endif
  'set clab masked'
  'set clopts -1 4 0.08'
  'd smth9(MSLMAmsl/100)'

  'set gxout vector'
*###2.57222 m/s = 5 knots. This is the vector magnitude. The scale size is 0.05###
  'set arrscl 0.03 2.57222'
  'set arrowhead -0.3'
  'set arrlab off'
  'set cthick 5'
  'set ccolor 0'
  if (model = "glRAP")
    'd skip(ugrd10m * 1.9438444924406,3,3);vgrd10m * 1.9438444924406'
  else
    'd skip(ugrd10m * 1.9438444924406,6,6);vgrd10m * 1.9438444924406'
  endif

*  ===Runs colorbar and prints all text seen on image===*
  'run colorbar/xcbar.gs -direction v -fs 1 -fw .12 -fh .12 -line'
  'set strsiz 0.15'
  'set string 1 l 2'
  'draw string .1 8.25 2m RH (%), MSLP (hPa), 10m Wind Vectors (knts)'
  'set strsiz 0.11'
  'draw string .1 8.02 Initialized: 'inithr': 'initmonth' 'initday', 'inityr' -- Forecast Hour ['fhr':00]'
  'set string 1 r 1'
  'set strsiz 0.1'
  'draw string 10.95 8.4 Rapid Refresh (RAP) 13km'
  'set strsiz 0.08'
  'draw string 10.95 8.2 Data from NCEP'
  'set strsiz 0.12'
  'set string 1 bl 1'
  'draw string 6.4 0.08 Forecast Valid: 'vhr':'vmin'z: 'vmonth' 'vday', 'vyr
  'set rgb 255 0 0 229'
  'set string 255'
  'set string 255 bl 1'
  'draw string 0.11 0.08 http://derecho.math.uwm.edu/~bmburlin/'
  'gxprint 'fhr'_2m_RH.png x800 y600'
  'clear'

  count = count + inc
  t = t + inc
  fhr = fhr + inc
  endwhile
*  '!mv *2m_RH.png /tstorm/s0/bmburlin/wrf/POST/NCEP/'model'/images/2m_RH'
  '!mv *2m_RH.png /tornado/r1/bmburlin/public_html/graphics/'model'/2m_RH'
'quit'
